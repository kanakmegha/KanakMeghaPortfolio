// src/ai/flows/portfolio-chatbot.ts
import { ai } from '../init';
import { z } from 'genkit';

// 1. Define the schema separately so we can export the type
export const PortfolioChatbotInputSchema = z.object({
  message: z.string(),
});

// 2. Export the type so actions.ts can see it
export type PortfolioChatbotInput = z.infer<typeof PortfolioChatbotInputSchema>;

export const portfolioChatbot = ai.defineFlow(
  {
    name: 'portfolioChatbot',
    inputSchema: PortfolioChatbotInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const response = await ai.generate({
      model: 'hf-router/openai/gpt-oss-120b:groq',
      system: "You are Kanak's AI assistant...",
      prompt: input.message,
    });
    return response.text;
  }
);