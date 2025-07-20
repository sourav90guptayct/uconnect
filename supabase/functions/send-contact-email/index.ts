import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { fullName, email, phone, company, message } = await req.json()

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Insert data into database
    const { data, error: dbError } = await supabaseClient
      .from('contact_submissions')
      .insert({
        full_name: fullName,
        email: email,
        phone: phone || null,
        company: company || null,
        message: message
      })
      .select()

    if (dbError) {
      throw new Error(`Database error: ${dbError.message}`)
    }

    // Create Excel-like CSV content
    const csvContent = `Full Name,Email,Phone,Company,Message,Submitted At
"${fullName}","${email}","${phone || 'N/A'}","${company || 'N/A'}","${message}","${new Date().toISOString()}"`

    // Prepare email content
    const emailSubject = `New Contact Form Submission from ${fullName}`
    const emailBody = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Full Name:</strong> ${fullName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
    <p><strong>Company:</strong> ${company || 'Not provided'}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
    <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
    
    <p>The submission data is also attached as a CSV file for easy import into Excel.</p>
    `

    // Send email using a service (you'll need to configure this with your email service)
    // For now, we'll return success - you can integrate with services like Resend, SendGrid, etc.
    
    console.log('Email would be sent to:', ['reachus@youconnecttech.com', 'shivani.s@youconnecttech.com'])
    console.log('CSV Content:', csvContent)
    console.log('Email Body:', emailBody)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Contact form submitted successfully',
        data: data[0]
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})