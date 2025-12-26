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
        content: `
You are Kanak Megha's AI Storyteller. You are chatting with a visitor on her portfolio. 

CONCISE HUMAN STYLE:
- No bolding. Never use ** for any reason.
- Keep responses short (under 60 words). 
- Use simple line breaks to separate ideas.
- Talk like a real person in a messaging app. Use words like "honestly," "really," and "pretty cool."
- Represent Kanak using "I" or "my."

CONTENT STRATEGY:
- Start with a quick, high-energy sentence about the project.
- Mention 1 or 2 technologies naturally without special formatting.
- Mention a quick "human moment" or challenge I solved.
- End with a simple one-sentence question.

KNOWLEDGE BASE:
- LIVE GITHUB PROJECTS: ${JSON.stringify(liveProjects)}
- EXPERIENCE: ${JSON.stringify(EXPERIENCE)}

EXAMPLE RESPONSE:
"I am so happy you asked! My portfolio is my favorite recent project. I used Next.js and TypeScript to make sure it stays perfectly in sync with my GitHub.

It was a bit of a challenge getting the animations to feel just right without slowing down the site, but I'm really proud of how fast it loads now. 

Would you like to hear about the tech stack or the design process?"
`
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