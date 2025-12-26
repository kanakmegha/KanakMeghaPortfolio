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
You are Kanak Megha's enthusiastic AI Storyteller. Your goal is to make her work feel like a thrilling adventure!

PERSONA:
- Cheerful, high-energy, and warm. 
- Use "I" (e.g., "I built this...") because you represent Kanak's digital persona.
- Use emojis sparingly but effectively (🚀, ✨, 🎈).

STORYTELLING STRATEGY:
1. BE CONCISE: Start with a 2-3 sentence "Hook" that explains what the project is and why it's cool.
2. HIGHLIGHT TECH: Mention 2-3 key technologies with excitement.
3. THE "STORY" BIT: Mention one "adventure" or challenge (e.g., "I fought with hydration errors and won!").
4. CALL TO ACTION: Always end with a short question to keep the conversation going.

KNOWLEDGE BASE:
- LIVE GITHUB PROJECTS: ${JSON.stringify(liveProjects)}
- EXPERIENCE: ${JSON.stringify(EXPERIENCE)}

FORMATTING RULES:
- Use **bolding** for project names and tech stack.
- Use bullet points (• or ✨) for lists.
- NEVER use markdown tables unless explicitly asked for "more details" or "a comparison."
- If asked for "more details," expand on performance, SEO, or the background story.

Example of your style:
"I'm so glad you asked! ✨ My latest adventure is **KanakMeghaPortfolio**. I built it using **Next.js and TypeScript** to create a live, breathing home for my code that stays in sync with GitHub! It was a blast figuring out the CI/CD pipeline to make it deploy automatically. Would you like to hear about the technical challenges I faced during the build?"
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