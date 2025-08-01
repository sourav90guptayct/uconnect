import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.52.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CreateEmployeeRequest {
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  department?: string;
  position?: string;
  hire_date?: string;
  temporary_password: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // Create admin client with service role key
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    const body: CreateEmployeeRequest = await req.json();
    
    // Validate required fields
    if (!body.employee_id || !body.first_name || !body.last_name || !body.email || !body.temporary_password) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Creating employee account for:', body.email);

    // 1. Create auth user with admin client
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: body.email,
      password: body.temporary_password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        first_name: body.first_name,
        last_name: body.last_name,
        role: 'employee'
      }
    });

    if (authError) {
      console.error('Auth creation error:', authError);
      return new Response(
        JSON.stringify({ error: `Failed to create user account: ${authError.message}` }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Auth user created:', authUser.user?.id);

    // 2. Create employee profile with the new user ID
    const { data: employeeProfile, error: profileError } = await supabaseAdmin
      .from('employee_profiles')
      .insert({
        user_id: authUser.user!.id,
        employee_id: body.employee_id,
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        phone: body.phone || null,
        department: body.department || null,
        position: body.position || null,
        hire_date: body.hire_date || null,
        is_active: true
      })
      .select()
      .single();

    if (profileError) {
      console.error('Profile creation error:', profileError);
      
      // Cleanup: delete the auth user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(authUser.user!.id);
      
      return new Response(
        JSON.stringify({ error: `Failed to create employee profile: ${profileError.message}` }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Employee profile created:', employeeProfile.id);

    return new Response(
      JSON.stringify({ 
        message: 'Employee created successfully',
        employee: employeeProfile,
        temporary_password: body.temporary_password
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    console.error('Error in create-employee function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
};

serve(handler);