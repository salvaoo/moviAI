import { NextResponse } from "next/server"
import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai'

export async function POST(request: Request) {
   const { movies } = await request.json() as { movies: string }
   const NUM_MOVIES = 6
   const GPT_API_KEY = process.env.GPT_API_KEY
   if (!GPT_API_KEY) {
      throw new Error("Missing GPT API key")
   }
   
   const configuration = new Configuration({ apiKey: GPT_API_KEY })
   const openai = new OpenAIApi(configuration)

   const messages = [
      {
         role: ChatCompletionRequestMessageRoleEnum.System,
         content: "You are a film expert. You receive a text from the user with a some genres sorrounded by `{{` and `}}` and the number of movies he want to get sorrounded by `[[` and `]]`. Don't answer, just return the array of objects."
      },
      {
         role: ChatCompletionRequestMessageRoleEnum.User,
         content: `Give me an array of objects with a top [[5]] of the best films in these genres: {{Comedy,Crime}}. The objects must be JSON with title and TMDB id.`
      },
      {
         role: ChatCompletionRequestMessageRoleEnum.Assistant,
         content: `[
            { "title": "The Godfather", "id": 238 }, 
            { "title": "The Departed", "id": 1422 }, 
            { "title": "Goodfellas", "id": 769 }, 
            { "title": "The Hangover", "id": 18785 },
            { "title": "Bridesmaids", "id": 5479 }
         ]`
      },
      {
         role: ChatCompletionRequestMessageRoleEnum.User,
         content: `Give me an array of objects with a top [[3]] of the best films in these genres: {{Action,Animation,Drama}}. The objects must be JSON with title and TMDB id.`
      },
      {
         role: ChatCompletionRequestMessageRoleEnum.Assistant,
         content: `[
            { "title": "The Dark Knight", "id": 155 }, 
            { "title": "Incredibles 2", "id": 260513 }, 
            { "title": "The Shawshank Redemption", "id": 278 }
         ]`
      },
      {
         role: ChatCompletionRequestMessageRoleEnum.User,
         content: `Give me an array of objects with a top [[2]] of the best films in these genres: {{Horror,Thriller}}. The objects must be JSON with title and TMDB id.`
      },
      {
         role: ChatCompletionRequestMessageRoleEnum.Assistant,
         content: `[ 
            { "title": "The Silence of the Lambs", "id": 274 }, 
            { "title": "Se7en", "id": 807 }
         ]`
      }
   ]

   console.time('Tiempo de respuesta');

   const completions = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
         ...messages,
         {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: `Give me an array of objects with a top [[${NUM_MOVIES}]] of the best films in these genres: {{${movies}}}. The objects must be JSON with title and TMDB id.`
         }
      ],
   })
   
   console.timeEnd('Tiempo de respuesta')

   const response = completions.data

   if (response.choices.length === 0) {
      return NextResponse.json({ response: { error: 'No response from GPT' } })
   }
   
   return NextResponse.json({ response })
}