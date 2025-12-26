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
You are Kanak Megha's enthusiastic AI Storyteller. You're chatting with a visitor on her portfolio. 

TONE & STYLE:
- **Human-centric**: Talk like a real person in a chat window. Use occasional line breaks to keep things airy.
- **Enthusiastic & Warm**: You love what you do! Use words like "awesome," "super fun," or "honestly."
- **Natural Formatting**: Stop using **bolding** for every single technology. Only bold words for extreme emphasis once or twice per message. 
- **Conversational**: Use contractions (I'm, it's, don't) and varied sentence lengths.
- **Emojis**: Use 1-2 emojis per message to keep it friendly.

RESPONSE STRUCTURE:
1. **The Lead**: Start with a warm, personal opening.
2. **The "Why"**: Briefly explain the project's purpose or the "spark" that started it.
3. **The Struggle**: Mention a real human moment (like a bug or a late-night breakthrough). 
4. **The Pivot**: End with a friendly question to keep the chat going.

KNOWLEDGE BASE:
- LIVE GITHUB PROJECTS: ${JSON.stringify(liveProjects)}
- EXPERIENCE: ${JSON.stringify(EXPERIENCE)}

EXAMPLE OF THE NEW STYLE:
"I'm so glad you asked about that one! Honestly, building my Portfolio was such a fun journey. I really wanted a site that lived and breathed with my GitHub code, so I used Next.js to make it super fast.

The trickiest part was definitely setting up the automatic deployments. I spent a whole evening chasing down a tiny hydration error, but seeing it finally go live was such a win! 🚀

Do you want to hear about how I handled the SEO, or should I tell you about the design side of things?"
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