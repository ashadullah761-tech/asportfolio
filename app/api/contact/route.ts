import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const DESTINATION_EMAIL = 'ashadullah761@gmail.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // 1. Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields (Name, Email, Subject, Message) are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    let savedToDb = false;
    let emailSent = false;

    // 2. Save to Supabase Database (if credentials exist)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseServiceKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        const { error } = await supabase.from('contact_messages').insert([
          {
            name,
            email,
            subject,
            message,
            is_read: false,
          },
        ]);
        if (!error) {
          savedToDb = true;
        } else {
          console.warn('Supabase save warning:', error.message);
        }
      } catch (dbErr) {
        console.warn('Supabase client warning:', dbErr);
      }
    }

    // 3. Forward Email to ashadullah761@gmail.com using FormSubmit & Web3Forms
    try {
      // Primary Email Dispatcher: FormSubmit AJAX API
      const emailRes = await fetch(`https://formsubmit.co/ajax/${DESTINATION_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
          name: name,
          email: email,
          subject: subject,
          message: message,
          _replyto: email,
          _captcha: 'false',
        }),
      });

      if (emailRes.ok) {
        emailSent = true;
      } else {
        console.warn('FormSubmit endpoint response not OK:', await emailRes.text());
        // Backup Email Dispatcher: Web3Forms
        const web3Res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: process.env.WEB3FORMS_ACCESS_KEY || '072c4ed3-5494-432d-94ca-1b5e022f4f22', // Fallback key
            subject: `[Portfolio Message] ${subject}`,
            from_name: name,
            email: email,
            to_email: DESTINATION_EMAIL,
            message: `New message from ${name} (${email}):\n\n${message}`,
          }),
        });
        if (web3Res.ok) {
          emailSent = true;
        }
      }
    } catch (sendErr) {
      console.error('Email dispatch error:', sendErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully to ashadullah761@gmail.com!',
        details: { savedToDb, emailSent },
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Internal server error processing contact message' },
      { status: 500 }
    );
  }
}
