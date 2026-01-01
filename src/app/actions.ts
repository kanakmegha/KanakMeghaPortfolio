'use server'

import { OpenAI } from "openai";
import { EXPERIENCE } from "@/lib/data"; 
import nodemailer from 'nodemailer'; // Ensure you ran: npm install nodemailer

const client = new OpenAI({
  apiKey: process.env.HF_TOKEN,
  baseURL: "https://router.huggingface.co/v1",
});

export async function askChatbot(message: string, liveProjects: any[]) {
  // ... (Your existing askChatbot code stays exactly as it is) ...
}

// --- UPDATED CONTACT FORM ACTION ---

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export async function sendContactEmail(data: ContactFormData) {
  // 1. Validate environment variables before attempting connection
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("Missing Environment Variables: EMAIL_USER or EMAIL_PASS");
    return { success: false, message: "Server configuration error. Please try again later." };
  }

  // 2. Create the SMTP Transporter (The "Courier")
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465, // SSL Port
    secure: true, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Your 16-digit App Password
    },
  });

  try {
    // 3. Send the Mail
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Sends the email TO yourself
      replyTo: data.email,        // Allows you to hit "Reply" to the sender
      subject: `New Message from ${data.name} via Portfolio`,
      text: data.message,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #007bff;">New Contact Inquiry</h2>
          <p><strong>From:</strong> ${data.name} (${data.email})</p>
          <hr style="border: none; border-top: 1px solid #eee;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; line-height: 1.6;">${data.message}</p>
        </div>
      `,
    });

    return { 
      success: true, 
      message: "Thanks for reaching out! I'll get back to you soon." 
    };

  } catch (error) {
    console.error("Nodemailer Error:", error);
    return { 
      success: false, 
      message: "Mail server error. Please reach out via LinkedIn instead!" 
    };
  }
}