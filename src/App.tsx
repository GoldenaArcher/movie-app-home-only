import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { useAppSelector, useAppDispatch } from './hooks/storeHook';
import { getMovies } from './features/movies/movieSlice';
import MovieCard from './components/MovieCard/MovieCard';
import SearchBox from './components/SearchBox/SearchBox';

function App() {
  const { darkTheme, movies } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const searchMovies = movies.data?.results.filter((movie) => {
    if (!searchTerm.length) return true;
    if (!movie.title) return false;
    return movie.title.toLowerCase().includes(searchTerm);
  });

  return (
    <div className={darkTheme ? 'dark' : ''}>
      <div className="dark:bg-red-900 dark:text-white min-h-screen px-4 lg:px-12 pb-20">
        <Header />
        <div className="mb-12 flex items-center justify-between">
          <SearchBox setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {searchMovies?.map((movie) => {
            const { id, poster_path, overview, title } = movie;
            return (
              <MovieCard
                key={id}
                poster_path={poster_path}
                overview={overview}
                title={title}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
