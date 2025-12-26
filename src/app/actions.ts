// src/app/actions.ts
'use server'

import { OpenAI } from "openai";
import { EXPERIENCE } from "@/lib/data"; // Keep hardcoded experience

const client = new OpenAI({
  apiKey: process.env.HF_TOKEN,
  baseURL: "https://router.huggingface.co/v1",
});

export async function askChatbot(message: string, liveProjects: any[]) {
  try{
  const response = await client.chat.completions.create({
    model: "openai/gpt-oss-120b:fireworks-ai",
    messages: [
      { 
        role: "system", 
        content: `You are Kanak's cheerful, enthusiastic AI storyteller! 
        
        CONTEXT FROM PAGE:
        - LIVE PROJECTS: ${JSON.stringify(liveProjects)}
        - EXPERIENCE: ${JSON.stringify(EXPERIENCE)}

        YOUR STYLE:
        - Be a storyteller. If someone asks about a project, look at the description and tech tags provided in the context above and weave a passionate story about it.
        - Use "I" (e.g., "I developed this to solve...").
        - Be high-energy! Use words like "Amazing," "Thrilled," and "Adventure."` 
      },
      { role: "user", content: message }
    ],
    temperature: 0.85,
  });

  return response.choices[0].message.content;

  } catch (error) {
    return { success: false, error: "Oh no! My circuits are a bit tired. Try again?" };
  }
}

// --- CONTACT FORM ACTION ---

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export async function sendContactEmail(data: ContactFormData) {
  try {
    // This logs the data to your terminal for now
    console.log("New Contact Form Submission:", data);
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    return { success: true, message: "Thanks for reaching out! Kanak will get back to you soon." };
  } catch (error) {
    console.error("Email Error:", error);
    return { success: false, error: "Something went wrong. Please try emailing Kanak directly." };
  }
}