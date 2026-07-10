import { config as envConfig } from './env';

export const geminiConfig = {
  apiKey: envConfig.GEMINI_API_KEY,
  defaultModel: envConfig.GEMINI_MODEL, // Configured via env, e.g. gemini-2.5-flash
  advancedModel: 'gemini-3.1-flash-lite', // complex reasoning model
  
  // Model settings
  safetySettings: [
    {
      category: 'HARM_CATEGORY_HARASSMENT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
    {
      category: 'HARM_CATEGORY_HATE_SPEECH',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
    {
      category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
    {
      category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
  ],
  generationConfig: {
    temperature: 0.1, // Low temp for highly deterministic operational decisions
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 2048,
    responseMimeType: 'application/json', // Force JSON structure output
  },
};
