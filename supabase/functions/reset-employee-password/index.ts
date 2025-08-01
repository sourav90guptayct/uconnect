import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.52.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ResetPasswordRequest {
  employee_id: string;
  new_password: string;
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

    const body: ResetPasswordRequest = await req.json();
    
    // Validate required fields
    if (!body.employee_id || !body.new_password) {
      return new Response(
        JSON.stringify({ error: 'Missing employee_id or new_password' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Resetting password for employee:', body.employee_id);

    // 1. Get employee profile to find user_id
    const { data: employee, error: employeeError } = await supabaseAdmin
      .from('employee_profiles')
      .select('user_id, first_name, last_name, email')
      .eq('id', body.employee_id)
      .single();

    if (employeeError || !employee) {
      console.error('Employee not found:', employeeError);
      return new Response(
        JSON.stringify({ error: 'Employee not found' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Found employee:', employee.email);

    // 2. Update user password using admin client
    const { error: passwordError } = await supabaseAdmin.auth.admin.updateUserById(
      employee.user_id,
      {
        password: body.new_password
      }
    );

    if (passwordError) {
      console.error('Password update error:', passwordError);
      return new Response(
        JSON.stringify({ error: `Failed to update password: ${passwordError.message}` }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Password updated successfully for:', employee.email);

    return new Response(
      JSON.stringify({ 
        message: 'Password updated successfully',
        employee_name: `${employee.first_name} ${employee.last_name}`
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    console.error('Error in reset-employee-password function:', error);
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