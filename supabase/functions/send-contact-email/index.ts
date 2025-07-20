import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from 'npm:resend@2.0.0'
import { z } from 'npm:zod@3.23.8'

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))
console.log('RESEND_API_KEY exists:', !!Deno.env.get('RESEND_API_KEY'))

// Input validation schema
const ContactFormSchema = z.object({
  fullName: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email format').max(254, 'Email too long'),
  phone: z.string().max(20, 'Phone too long').optional().nullable(),
  company: z.string().max(100, 'Company name too long').optional().nullable(),
  message: z.string().min(1, 'Message is required').max(2000, 'Message too long')
})

// HTML sanitization function
function sanitizeForHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const requestBody = await req.json()
    
    // Validate input using Zod schema
    const validationResult = ContactFormSchema.safeParse(requestBody)
    if (!validationResult.success) {
      console.error('Validation failed:', validationResult.error.issues)
      return new Response(
        JSON.stringify({ 
          error: 'Invalid input data',
          details: validationResult.error.issues.map(issue => issue.message)
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    const { fullName, email, phone, company, message } = validationResult.data

    // Initialize Supabase client with proper credentials for RLS compliance
    const supabaseClient = createClient(
      'https://dlgrlanmnvpwladkhexb.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsZ3JsYW5tbnZwd2xhZGtoZXhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTY2NTAsImV4cCI6MjA2ODU5MjY1MH0.ql17Vfaz7fEFFE9HxX2VxYJBo50vUghXKZZgCUFo9HE'
    )

    console.log('About to insert into database...')
    
    // Insert data into database (RLS allows public inserts)
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
      console.error('Database error:', dbError.message, dbError)
      return new Response(
        JSON.stringify({ error: 'Failed to submit contact form', details: dbError.message }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      )
    }

    console.log('Database insertion successful:', data)

    // Sanitize data for HTML email
    const safeFullName = sanitizeForHtml(fullName)
    const safeEmail = sanitizeForHtml(email)
    const safePhone = phone ? sanitizeForHtml(phone) : 'Not provided'
    const safeCompany = company ? sanitizeForHtml(company) : 'Not provided'
    const safeMessage = sanitizeForHtml(message)

    // Send email to both recipients
    const emailResponse = await resend.emails.send({
      from: 'YouConnect Technologies <noreply@resend.dev>',
      to: ['reachus@youconnecttech.com', 'shivani.s@youconnecttech.com'],
      subject: `New Contact Form Submission from ${safeFullName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>New Contact Form Submission</title>
          </head>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">New Contact Form Submission</h2>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Full Name:</strong> ${safeFullName}</p>
              <p><strong>Email:</strong> ${safeEmail}</p>
              <p><strong>Phone:</strong> ${safePhone}</p>
              <p><strong>Company:</strong> ${safeCompany}</p>
              <p><strong>Message:</strong></p>
              <div style="background-color: white; padding: 15px; border-left: 4px solid #0066cc; margin: 10px 0;">
                ${safeMessage.replace(/\n/g, '<br>')}
              </div>
              <p style="color: #666; font-size: 0.9em;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
          </body>
        </html>
      `,
    });

    if (emailResponse.error) {
      console.error('Email sending error:', emailResponse.error);
      // Don't expose email service errors to client
      return new Response(
        JSON.stringify({ error: 'Failed to send notification email' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      )
    }

    console.log('Contact form submitted successfully:', {
      id: data[0]?.id,
      email: email,
      emailId: emailResponse.data?.id
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Contact form submitted successfully'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    // Don't expose internal error details to client
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred. Please try again later.' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})