import type { APIRoute } from 'astro';
import { submitChatMessage } from '../../lib/api/chat';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const response = await submitChatMessage(body.message);
    
    return new Response(JSON.stringify({ response }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};