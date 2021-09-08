export const BaseURL = 'https://api.themoviedb.org/3/'
export const imageURL = 'https://image.tmdb.org/t/p/'
export const genresURL = `genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`

export const trendingMovies = `trending/movie/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
export const trendingShows = `trending/tv/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
export const recommended = `trending/tv/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}`