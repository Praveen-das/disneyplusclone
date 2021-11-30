export const API_KEY = process.env.REACT_APP_TMDB_API_KEY
export const BaseURL = 'https://api.themoviedb.org/3/'
export const imageURL = 'https://image.tmdb.org/t/p/'
export const movieGenresURL = `genre/movie/list?api_key=${API_KEY}&language=en-US`
export const tvShowsGenresURL = `genre/tv/list?api_key=${API_KEY}&language=en-US`
export const sortURL = `discover/movie?api_key=${API_KEY}`
export const searchURL = `search/movie?api_key=${API_KEY}&page=1`

export const disneyImg = 'https://img1.hotstarext.com/image/upload/f_auto,t_web_hm_m1/sources/r1/cms/prod/7034/677034-m'
export const pixarImg = 'https://img1.hotstarext.com/image/upload/f_auto,t_web_hm_m1/sources/r1/cms/prod/7039/677039-m'
export const marvelImg = 'https://img1.hotstarext.com/image/upload/f_auto,t_web_hm_m1/sources/r1/cms/prod/6882/676882-m'
export const starwarsImg = 'https://img1.hotstarext.com/image/upload/f_auto,t_web_hm_m1/sources/r1/cms/prod/7040/677040-m'
export const natgeoImg = 'https://img1.hotstarext.com/image/upload/f_auto,t_web_hm_m1/sources/r1/cms/prod/7036/677036-m'

export const
    channelImageURLs = [
        { id: 'disney', url: 'https://img1.hotstarext.com/image/upload/f_auto,t_web_hm_m1/sources/r1/cms/prod/7034/677034-m' },
        { id: 'pixar', url: 'https://img1.hotstarext.com/image/upload/f_auto,t_web_hm_m1/sources/r1/cms/prod/7039/677039-m' },
        { id: 'marvel', url: 'https://img1.hotstarext.com/image/upload/f_auto,t_web_hm_m1/sources/r1/cms/prod/6882/676882-m' },
        { id: 'star-wars', url: 'https://img1.hotstarext.com/image/upload/f_auto,t_web_hm_m1/sources/r1/cms/prod/7040/677040-m' },
        { id: 'nat-geo', url: 'https://img1.hotstarext.com/image/upload/f_auto,t_web_hm_m1/sources/r1/cms/prod/7036/677036-m' }],

    channelVideoURLs = [
        { id: 'disney', url: 'https://firebasestorage.googleapis.com/v0/b/disneyplusclone-a78e3.appspot.com/o/Assets%2FdisneyBanner.mp4?alt=media&token=9ae83ce3-6940-4993-b57c-427318fd72a6' },
        { id: 'pixar', url: 'https://firebasestorage.googleapis.com/v0/b/disneyplusclone-a78e3.appspot.com/o/Assets%2FpixarBanner.mp4?alt=media&token=eec878be-1b37-4c3e-b0ca-7fd0c845001a' },
        { id: 'marvel', url: 'https://firebasestorage.googleapis.com/v0/b/disneyplusclone-a78e3.appspot.com/o/Assets%2FmarvelBanner.mp4?alt=media&token=c50cb166-a2ba-488e-8e68-30aa783944a8' },
        { id: 'star-wars', url: 'https://firebasestorage.googleapis.com/v0/b/disneyplusclone-a78e3.appspot.com/o/Assets%2Fstar-warsBanner.mp4?alt=media&token=2bf7b70a-b11d-49b3-a29b-210c54e2ed2a' },
        { id: 'nat-geo', url: 'https://firebasestorage.googleapis.com/v0/b/disneyplusclone-a78e3.appspot.com/o/Assets%2Fnat-geoBanner.mp4?alt=media&token=83a25e2c-a114-485a-8669-784a5b191306' }]


export const trendingMovies = `trending/movie/day?api_key=${API_KEY}`
export const trendingShows = `trending/tv/day?api_key=${API_KEY}`
export const popularShows = `tv/popular?api_key=${API_KEY}`
export const topRatedTvShows = `tv/top_rated?api_key=${API_KEY}`
export const recommended = `trending/tv/day?api_key=${API_KEY}`