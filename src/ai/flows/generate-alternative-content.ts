'use server';

/**
 * @fileOverview Generates alternative headlines and bio variants for a portfolio.
 *
 * - generateAlternativeContent - A function that generates alternative content.
 * - GenerateAlternativeContentInput - The input type for the generateAlternativeContent function.
 * - GenerateAlternativeContentOutput - The return type for the generateAlternativeContent function.
 */

import {ai} from '@/ai/init';
import {z} from 'genkit';

const GenerateAlternativeContentInputSchema = z.object({
  currentHeadline: z
    .string()
    .describe('The current headline of the portfolio.'),
  currentBio: z.string().describe('The current bio of the portfolio.'),
});
export type GenerateAlternativeContentInput = z.infer<
  typeof GenerateAlternativeContentInputSchema
>;

const GenerateAlternativeContentOutputSchema = z.object({
  alternativeHeadlines: z.array(z.string()).describe('Alternative headlines.'),
  alternativeBios: z.array(z.string()).describe('Alternative bios.'),
});
export type GenerateAlternativeContentOutput = z.infer<
  typeof GenerateAlternativeContentOutputSchema
>;

export async function generateAlternativeContent(
  input: GenerateAlternativeContentInput
): Promise<GenerateAlternativeContentOutput> {
  return generateAlternativeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAlternativeContentPrompt',
  input: {schema: GenerateAlternativeContentInputSchema},
  output: {schema: GenerateAlternativeContentOutputSchema},
  prompt: `You are an AI assistant helping users generate alternative content for their portfolio.

You will generate alternative headlines and bio variants based on the user's current headline and bio.

Current Headline: {{{currentHeadline}}}
Current Bio: {{{currentBio}}}

Generate 3 alternative headlines and 3 alternative bios. Be creative and engaging.

Format your response as a JSON object with "alternativeHeadlines" and "alternativeBios" fields, each containing an array of strings.
`,
});

const generateAlternativeContentFlow = ai.defineFlow(
  {
    name: 'generateAlternativeContentFlow',
    inputSchema: GenerateAlternativeContentInputSchema,
    outputSchema: GenerateAlternativeContentOutputSchema,
  },
  async (input: any) => {
    const {output} = await prompt(input);
    return output!;
  }
);
