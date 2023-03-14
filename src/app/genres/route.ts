import { NextResponse } from "next/server";

import type { Genre } from "~/types/genre";

export async function GET() {
  const URL = process.env.TMDB_API_URL || 'https://api.themoviedb.org/3';
  const TMDB_API_KEY = process.env.TMDB_API_KEY || '114835b3b2fb9886e0aefc6f94f2b0f3';

  const response = await fetch(`${URL}/genre/movie/list?api_key=${TMDB_API_KEY}`)

  const data = await response.json() as { genres: Genre[] };

  return NextResponse.json({ data })
}