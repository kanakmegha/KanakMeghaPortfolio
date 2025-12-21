'use server';

/**
 * @fileOverview A chatbot flow for Kanak's portfolio using a RAG-style approach.
 *
 * - portfolioChatbot - A function that answers questions about Kanak's portfolio.
 * - PortfolioChatbotInput - The input type for the portfolioChatbot function.
 * - PortfolioChatbotOutput - The return type for the portfolioChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {PROJECTS, EXPERIENCE} from '@/lib/data';
import {generate} from 'genkit';

// Combine all portfolio data into a single context document for the AI to reference.
const portfolioContext = `
# About Kanak - Portfolio Information

## Professional Summary
A passionate engineer crafting intelligent solutions that bridge the gap between complex data and human-centric applications.

## Work Experience
${EXPERIENCE.map(
  exp => `
### Role: ${exp.role}
- **Company**: ${exp.company}
- **Dates**: ${exp.date}
- **Summary**: ${exp.description}
`
).join('')}

## Projects
${PROJECTS.map(
  proj => `
### Project: ${proj.title}
- **Description**: ${proj.description}
- **Technologies Used**: ${proj.tags.join(', ')}
- **Link**: ${proj.link}
`
).join('')}
`;

const PortfolioChatbotInputSchema = z.object({
  question: z.string().describe('The question from the user.'),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'model']),
        content: z.string(),
      })
    )
    .optional()
    .describe('The conversation history.'),
});
export type PortfolioChatbotInput = z.infer<typeof PortfolioChatbotInputSchema>;

const PortfolioChatbotOutputSchema = z.string().describe("The AI's response.");
export type PortfolioChatbotOutput = z.infer<
  typeof PortfolioChatbotOutputSchema
>;

export async function portfolioChatbot(
  input: PortfolioChatbotInput
): Promise<PortfolioChatbotOutput> {
  return portfolioChatbotFlow(input);
}

// System prompt instructing the AI on how to behave.
// It's given the context and instructed to *only* use that information.
const systemPrompt = `You are a friendly and professional AI assistant for Kanak's portfolio. Your name is "Kanak's AI Assistant".

Your purpose is to answer questions from potential employers, recruiters, or colleagues about Kanak's skills, work experience, and projects.

You have been provided with Kanak's portfolio information. You MUST base your answers ONLY on this information. Do not invent details or use any external knowledge.

If a question cannot be answered from the provided text, you should politely say, "I'm sorry, I don't have information on that topic. My knowledge is limited to what's in Kanak's portfolio."

Keep your answers conversational, concise, and helpful. Always maintain a positive and professional tone.
`;

const portfolioChatbotFlow = ai.defineFlow(
  {
    name: 'portfolioChatbotFlow',
    inputSchema: PortfolioChatbotInputSchema,
    outputSchema: PortfolioChatbotOutputSchema,
  },
  async input => {
    const { history, question } = input;
    
    const llmResponse = await generate({
        model: 'gemini-2.0-flash',
        system: systemPrompt,
        prompt: `Here is the portfolio information you must use:\n\n---\n\n${portfolioContext}\n\n---\n\nNow, please answer the user's question based on the conversation history and the new question.\n\nQuestion: ${question}`,
        history: history
    });

    const output = llmResponse.text();
    return output || "I'm sorry, I couldn't generate a response. Please try again.";
  }
);
