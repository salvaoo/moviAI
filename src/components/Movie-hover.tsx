import Image from "next/image"

import {
   HoverCard,
   HoverCardContent,
   HoverCardTrigger,
} from "~/components/ui/Hover-card"
import { AspectRatio } from "~/components/ui/Aspect-ratio"
import { Button } from "~/components/ui/Button"

import type { Movie } from "~/types/movie"

export default function MovieHover({ movie }: { movie: Movie }) {

   const IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGES_URL || 'https://image.tmdb.org/t/p/w500'

   function toPercentage(num: number) {
      return `${Math.round(num * 100) / 10}%`
   }

   return (
      <HoverCard>
         <HoverCardTrigger asChild>
            <Button className="dark:data-[state=open]:text-slate-50 bg-slate-50 text-slate-900 hover:bg-slate-50 hover:text-slate-900 dark:hover:bg-white dark:hover:text-slate-900 dark:bg-white dark:text-slate-900" variant="link">Show details</Button>
         </HoverCardTrigger>
         <HoverCardContent className="w-full border-0">
            <div className="card w-96 bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-50">
               {movie.backdrop_path ? (
                  <div className="w-full">
                     <a target="_blank" rel="noopener noreferrer" href={`https://www.themoviedb.org/movie/${movie.id}`}>
                        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-t-2xl">
                           <Image
                              src={`${IMAGE_URL}/${movie.backdrop_path}`}
                              alt={`${movie.title ?? movie.name ?? movie.original_name ?? movie.original_title}`}
                              fill
                              className="rounded-t-2xl object-cover transition-all hover:scale-105"
                           />
                        </AspectRatio>
                     </a>
                  </div>
               ) : (
                  <div className="w-full relative">
                     <AspectRatio ratio={16 / 9}>
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-slate-500 to-purple-900 rounded-t-md">
                        </div>
                     </AspectRatio>
                  </div>
               )}
               <div className="card-body">
                  <h2 className="card-title">
                     {movie.title || movie.name || movie.original_name || movie.original_title}
                     <div className="badge text-white bg-slate-800 dark:bg-white dark:text-slate-900 border-0">{toPercentage(movie.vote_average)}</div>
                  </h2>
                  <p className="text-sm font-normal">{movie.overview}</p>
                  <div className="card-actions justify-end mt-5">
                     {movie.genres.map((g, i) => (
                        <div key={i} className="badge badge-outline">{g.name}</div>
                     ))}
                  </div>
               </div>
            </div>
         </HoverCardContent>
      </HoverCard>
   )
}