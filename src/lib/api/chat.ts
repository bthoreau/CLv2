import OpenAI from 'openai';
import { CHAT_CONFIG } from '../config/chat';

const OPENAI_API_KEY = import.meta.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});

export async function submitChatMessage(message: string): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured');
  }

  try {
    const completion = await openai.chat.completions.create({
      model: CHAT_CONFIG.model,
      messages: [
        {
          role: "system",
          content: CHAT_CONFIG.systemPrompt
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: CHAT_CONFIG.temperature,
      max_tokens: CHAT_CONFIG.maxTokens
    });

    return completion.choices[0].message.content || 'Sorry, I could not generate a response.';
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Failed to generate response');
  }
}