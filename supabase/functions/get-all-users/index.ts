import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface Database {
  public: {
    Tables: {
      candidate_profiles: {
        Row: {
          id: string
          user_id: string
          first_name: string
          last_name: string
          phone: string | null
          current_city: string | null
          home_location: string | null
          total_experience: string | null
          expected_salary: number | null
          created_at: string
        }
      }
    }
  }
}

Deno.serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create a Supabase client with the service role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Verify the user making the request is authenticated and is an admin
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token)
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Check if user has admin role
    const { data: userRoles, error: roleError } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single()

    if (roleError || !userRoles) {
      return new Response(
        JSON.stringify({ error: 'Forbidden: Admin access required' }),
        { 
          status: 403, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get all users from auth.users
    const { data: authUsers, error: authError } = await supabaseAdmin.auth.admin.listUsers()
    
    if (authError) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch users' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get all candidate profiles
    const { data: profiles, error: profileError } = await supabaseAdmin
      .from('candidate_profiles')
      .select('*')

    if (profileError) {
      console.error('Error fetching profiles:', profileError)
    }

    // Combine auth users with their profiles
    const usersWithProfiles = authUsers.users.map(authUser => {
      const profile = profiles?.find(p => p.user_id === authUser.id)
      return {
        id: authUser.id,
        email: authUser.email || 'No email',
        created_at: authUser.created_at,
        last_sign_in_at: authUser.last_sign_in_at,
        profile: profile || null
      }
    })

    return new Response(
      JSON.stringify({ users: usersWithProfiles }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})