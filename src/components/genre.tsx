'use client'

import { useState } from "react";
import Image from "next/image"

import { Toggle } from "~/components/ui/Toggle"
import { Button } from "~/components/ui/Button";
import { AspectRatio } from "~/components/ui/Aspect-ratio"

import { Icons } from "~/components/Icons"
import MovieHover from "./Movie-hover";

import { Genre } from "~/types/genre";
import { Movie } from "~/types/movie";

function Genre({ genres }: { genres: Array<Genre> }) {
   const [genresSelected, setGenresSelected] = useState<Array<Genre | undefined>>([]);
   const [loading, setLoading] = useState(0);
   const [movies, setMovies] = useState<Array<{ movie: Movie }>>([]);

   const IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGES_URL || 'https://image.tmdb.org/t/p/w500'

   const searchGPT = async () => {
      let movies = "";
      if (genresSelected !== undefined) {
         genresSelected.map(element => {
            if (typeof element?.name === "string") {
               movies += `${element.name},`;
            }
         });
      }
      // Remove the last comma
      movies = movies.slice(0, -1);

      const URL = process.env.SERVER_HOST || "http://localhost:3000";
      const response = await fetch(`${URL}/search`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            "movies": movies
         })
      });
      const data = await response.json();

      return data;
   }

   const getMovieInfo = async (id: number) => {
      const URL = process.env.SERVER_HOST || "http://localhost:3000";
      const response = await fetch(`${URL}/movies/${id}`, {
         method: "GET",
      });
      const data = await response.json();

      return data;
   }

   const getMoviesInfo = async (movies: Array<{ title: string, id: number }>) => {
      let moviesInfo = [];
      for (let i = 0; i < movies.length; i++) {
         const movie = movies[i];
         if (movie?.id === undefined) {
            continue;
         }
         const movieInfo = await getMovieInfo(movie.id);
         moviesInfo.push(movieInfo);
      }

      return moviesInfo;
   }


   const handleSearch = async () => {
      setMovies([]);
      if (genresSelected.length === 0) {
         console.log("No genres selected");
         return;
      }

      setLoading(1);
      const { response } = await searchGPT();

      if (response && response.choices && response.choices.length > 0) {
         const data = JSON.parse(response.choices[0].message.content);

         setLoading(2)

         const movies = await getMoviesInfo(data);
         setMovies(movies);
         setLoading(0);

      } else {
         console.log("Fail! No results found");
         setLoading(0);
      }
   }

   const handleToggle = (name: string) => {
      const index = genres.findIndex(genre => genre.name === name);
      if (index !== -1 && genres[index] !== undefined) {
         if (genresSelected.includes(genres[index])) {
            setGenresSelected(genresSelected.filter((genre) => genre !== genres[index]));
         } else {
            setGenresSelected([...genresSelected, genres[index]]);
         }
      }
   }

   return (
      <div className="flex flex-col gap-8">
         <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">What type of genre do you like?</h3>
         <div className="flex gap-5 flex-wrap items-center justify-center">
            {genres.map((genre) => (
               <Toggle
                  key={genre.id}
                  aria-label="Toggle italic"
                  className="dark:data-[state=on]:bg-slate-50 dark:data-[state=on]:text-slate-900 dark:bg-white/10 bg-slate-200 data-[state=on]:bg-[hsl(280,100%,70%)]/50 p-7"
                  onClick={() => handleToggle(genre.name)}
               >
                  {genre.name}
               </Toggle>
            ))}
         </div>

         {movies.length > 0 && (
            <div className="flex flex-col gap-8 mt-14">
               <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">Here are some movies you might like!</h3>
               <div className="flex gap-5 flex-wrap items-center justify-center">
                  {movies.map((movieInfo) => (
                     <div key={movieInfo.movie.id} className="flex flex-col min-w-[400px] w-[400px] items-center shadow-xl shadow-slate-900/20 rounded-2xl bg-transparent dark:shadow-slate-500/20">
                        <div className="card w-full relative">
                           {movieInfo.movie.backdrop_path ? (
                              <>
                                 <figure className="brightness-50 rounded-2xl">
                                    <AspectRatio ratio={16 / 9} className="overflow-hidden">
                                       <Image
                                          src={`${IMAGE_URL}/${movieInfo.movie.backdrop_path}`}
                                          alt={movieInfo.movie.title || movieInfo.movie.name || movieInfo.movie.original_name || movieInfo.movie.original_title}
                                          fill
                                          className="object-cover transition-all hover:scale-105"
                                       />
                                    </AspectRatio>
                                 </figure>
                                 <div className="card-body absolute h-full w-full">
                                    {movieInfo.movie.title || movieInfo.movie.name || movieInfo.movie.original_name || movieInfo.movie.original_title ? (
                                       <a target="_blank" rel="noopener noreferrer" href={`https://www.themoviedb.org/movie/${movieInfo.movie.id}`}>
                                          <h2 className="card-title text-slate-50">{movieInfo.movie.title || movieInfo.movie.name || movieInfo.movie.original_name || movieInfo.movie.original_title}</h2>
                                       </a>
                                    ) : (
                                       <h3 className="text-center">We can&apos;t get the movie info 😕</h3>
                                    )}
                                    <p className="text-slate-100">{movieInfo.movie.overview?.substring(0, 80) + "..."}</p>
                                    <div className="card-actions justify-center">
                                       <MovieHover movie={movieInfo.movie} />
                                    </div>
                                 </div>
                              </>
                           ) : (
                              <figure>
                                 <AspectRatio ratio={16 / 9}>
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-slate-500 to-purple-900 rounded-2xl">
                                    </div>
                                 </AspectRatio>
                              </figure>
                           )}
                        </div>
                     </div>
                  ))}
               </div >
            </div>
         )}

         {
            loading == 0 && (
               <Button className="mt-5 px-14 py-6 text-center self-center" onClick={handleSearch}>
                  <Icons.search className="h-4 w-4 mr-2" /> Search
               </Button>
            )
         }
         {
            loading == 1 && (
               <Button disabled className="mt-5 px-14 py-6 text-center self-center">
                  <Icons.loader className="mr-2 h-4 w-4 animate-spin" /> Getting your movies
               </Button>
            )
         }
         {
            loading == 2 && (
               <Button disabled className="mt-5 px-14 py-6 text-center self-center">
                  <Icons.loader className="mr-2 h-4 w-4 animate-spin" /> Building your movie list
               </Button>
            )
         }
      </div >
   )
}

export default Genre