import { genkit, z } from 'genkit';
import openAI from '@genkit-ai/compat-oai';
import { PROJECTS, EXPERIENCE } from '@/lib/data';

// 1. Initialize Genkit with the Hugging Face Router
const ai = genkit({
  plugins: [
    openAI({
      apiKey: process.env.HF_TOKEN, // Your Hugging Face Access Token
      baseURL: "https://router.huggingface.co/v1", // HF OpenAI-compatible endpoint
    }),
  ],
});

// 2. Map your data into a clear context block
const portfolioContext = `
RELEVANT PORTFOLIO DATA:
---
PROJECTS:
${PROJECTS.map(p => `- ${p.title}: ${p.description}`).join('\n')}

EXPERIENCE:
${EXPERIENCE.map(e => `- ${e.company} (${e.role}): ${e.description}`).join('\n')}
---
`;

// 3. Define the Input Schema (required for your import in actions.ts)
export const PortfolioChatbotInputSchema = z.object({
  message: z.string(),
});

export type PortfolioChatbotInput = z.infer<typeof PortfolioChatbotInputSchema>;

// 4. Define and EXPORT the flow
// The name "portfolioChatbot" MUST match your import in actions.ts
export const portfolioChatbot = ai.defineFlow(
  {
    name: 'portfolioChatbot',
    inputSchema: PortfolioChatbotInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const response = await ai.generate({
      // Reference the GPT-OSS 120B model via a provider like Fireworks or Cerebras
      model: 'openai/gpt-oss-120b:auto', 
      prompt: `
        You are a professional AI representative for this developer. 
        Answer the following question using ONLY the provided context.
        If the information is not present, say you don't know and invite them to reach out via email.

        CONTEXT:
        ${portfolioContext}

        USER QUESTION: ${input.message}
      `,
      config: {
        temperature: 0.7,
        maxTokens: 500,
      },
    });

    return response.text;
  }
);