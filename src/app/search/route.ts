import { NextResponse } from "next/server";

import type { GPTResponse } from '~/types/gptResponse'

// -- MODEL: gpt-3.5-turbo -- //
interface OpenAIStreamPayload {
   model: string;
   messages: Array<{ role: string; content: string }>;
   temperature: number;
   top_p: number;
   frequency_penalty: number;
   presence_penalty: number;
   n: number;
}

export async function POST(request: Request) {
   const { movies } = await request.json()  as { movies: string }

   const GPT_API_KEY = process.env.GPT_API_KEY
   if (!GPT_API_KEY) {
      throw new Error("Missing GPT API key");
   }
   const URL_GPT = 'https://api.openai.com/v1/chat/completions'

   const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GPT_API_KEY}`
   }

   const message = `Give me a Array object of the best 15 movies about these genres, acts as a movie expert. (the objects need to be a JSON with title and TMDB id): "${movies}"`;


   const payload: OpenAIStreamPayload = {
      model: 'gpt-3.5-turbo',
      "messages": [{
         "role": "user",
         "content": message
      }],
      temperature: 0.3,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      n: 1
   };

   const response = await fetch(URL_GPT, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
   }).then(res => res.json()) as GPTResponse;

   return NextResponse.json({ response })
}