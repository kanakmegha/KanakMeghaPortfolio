import { genkit } from 'genkit';
import { openAICompatible } from '@genkit-ai/compat-oai';

export const ai = genkit({
  plugins: [
    openAICompatible({
      name: 'hf-router', // Changed name to be more specific
      apiKey: process.env.HF_TOKEN_READ,
      baseURL: 'https://router.huggingface.co/v1',
    }),
  ],
});