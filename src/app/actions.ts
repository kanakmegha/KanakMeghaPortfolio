'use server'

import { OpenAI } from "openai";
import { EXPERIENCE } from "@/lib/data"; 
import nodemailer from 'nodemailer';

const client = new OpenAI({
  apiKey: process.env.HF_TOKEN,
  baseURL: "https://router.huggingface.co/v1",
});

// 1. Define strict return types for Type Safety
type ChatResponse = 
  | { success: true; data: string } 
  | { success: false; error: string };

export async function askChatbot(message: string, liveProjects: any[]): Promise<ChatResponse> {
  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-120b:fireworks-ai",
      messages: [
        { 
          role: "system", 
          content: `
You are Kanak Megha's AI Storyteller. Represent Kanak using "I".
No bolding (**). Keep it under 60 words.
LIVE GITHUB PROJECTS: ${JSON.stringify(liveProjects)}
EXPERIENCE: ${JSON.stringify(EXPERIENCE)}
`
        },
        { role: "user", content: message }
      ],
      temperature: 0.85,
    });

    return { 
      success: true, 
      data: response.choices[0].message.content || "I'm not sure how to answer that!" 
    };

  } catch (error) {
    console.error("AI Error:", error);
    return { 
      success: false, 
      error: "My circuits are a bit tired. Try asking again?" 
    };
  }
}

// --- CONTACT FORM ACTION ---

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export async function sendContactEmail(data: ContactFormData) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("Missing Environment Variables");
    return { success: false, message: "Server configuration error." };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: data.email,
      subject: `New Message from ${data.name}`,
      text: data.message,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #007bff;">New Contact Inquiry</h2>
          <p><strong>From:</strong> ${data.name} (${data.email})</p>
          <hr />
          <p>${data.message}</p>
        </div>
      `,
    });

    return { success: true, message: "Message sent! I'll get back to you soon." };
  } catch (error) {
    console.error("Email Error:", error);
    return { success: false, message: "Mail server error. Please try again later." };
  }
}