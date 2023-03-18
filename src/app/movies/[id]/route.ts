import { NextResponse } from "next/server";

import type { Movie } from "~/types/movie";

interface GetMovieRequest {
   id: number;
}

export const config = {
   runtime: "edge",
}

export async function GET(request: Request, {
   params,
}: {
   params: GetMovieRequest;
}) {
   const TMDB_URL = process.env.TMDB_API_URL
   if (!TMDB_URL) {
      throw new Error("Missing TMDB API URL");
   }

   const TMDB_API_KEY = process.env.TMDB_API_KEY
   if (!TMDB_API_KEY) {
      throw new Error("Missing TMDB API key");
   }

   try {
      const response = await fetch(`${TMDB_URL}/movie/${params.id}?api_key=${TMDB_API_KEY}`)
      const data = await response.json() as Movie;

      return NextResponse.json({ movie: data })
   } catch (error) {
      console.error("Failed to fetch movie", error);

      return NextResponse.json({
         error: "Failed to fetch movie"
      })
   }
}