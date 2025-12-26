'use server'

import { OpenAI } from "openai";

// 1. Initialize OpenAI client (matches your Python logic)
const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN, 
});

// --- CHATBOT ACTION ---

export type PortfolioChatbotInput = {
  message: string;
};

export async function askChatbot(input: PortfolioChatbotInput) {
  try {
    // Matches your working Python model and parameters
    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-120b:fireworks-ai",
      messages: [
        { 
          role: "system", 
          content: "You are Kanak's helpful assistant with high reasoning effort. Answer questions about their portfolio, skills in Next.js, and projects like QuickRead." 
        },
        { role: "user", content: input.message }
      ],
      max_tokens: 512,
      temperature: 0.7
    });

    const text = response.choices[0].message.content;

    return { 
      success: true, 
      data: text || "I couldn't generate a response." 
    };
  } catch (error: any) {
    console.error("Chatbot Action Error:", error);
    return { 
      success: false, 
      error: error.message || "Failed to get response from AI." 
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
  try {
    // This matches the export expected by your ContactSection component
    console.log("Received contact form data:", data);
    
    // Simulating a delay for the email sending process
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Email Error:", error);
    return { success: false, error: "Failed to send email." };
  }
}