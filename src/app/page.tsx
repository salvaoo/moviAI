import { ThemeToggle } from "~/components/Theme-toggle";
import Genre from "~/components/genre";

import type { Genre as GenreType } from "~/types/genre";

const getGenres = async () => {
   const URL = process.env.TMDB_API_URL || 'https://api.themoviedb.org/3'
   const TMDB_API_KEY = process.env.TMDB_API_KEY || '114835b3b2fb9886e0aefc6f94f2b0f3'

   const response = await fetch(`${URL}/genre/movie/list?api_key=${TMDB_API_KEY}`, {
      method: "GET",
   })
   const genres = await response.json() as { genres: Array<GenreType> }

   return genres
}

export default async function Page() {
   const genres = await getGenres();
   
   // const ball = useRef<HTMLDivElement>(null);
   // useEffect(() => {
   //    const listener = (event: MouseEvent) => {
   //       if (ball.current) {
   //          ball.current.style.left = `${event.pageX}px`;
   //          ball.current.style.top = `${event.pageY}px`;
   //       }
   //    };

   //    window.addEventListener('mousemove', listener);

   //    return () => {
   //       window.removeEventListener('mousemove', listener);
   //    };
   // }, [ball]);

   return (
      <main className="flex min-h-screen flex-col items-center justify-center ">
         {/* <div
          className="from-purple/10 to-blue-1/10 pointer-events-none absolute hidden h-80 w-80 translate-x-[-50%] translate-y-[-50%] transform rounded-full bg-gradient-to-br blur-3xl md:block"
          ref={ball}
        /> */}
         <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 z-10">
            <h1 className="text-5xl text-center font-extrabold tracking-tight sm:text-[5rem]">
               Search with <span className="text-[hsl(280,100%,70%)]">MoviAI</span>
            </h1>
            <Genre genres={genres.genres} />
            <ThemeToggle />

         </div>

      </main>
   )
}
