import axios from 'axios'

const key = '2eb695f4bcc055ca93e62d19753942e4';

const getTrends = (page) =>{
   return axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${key}&page=${page}`).then(data => data.data.results)
}


const getFilms = (query,page) => {
   return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}&language=en-US&page=${page}&include_adult=false`)
}
const getFilmInfo = (id) => {
   return axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`)
}
const getFilmCast = (id) => {
   return axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${key}`)
}

const getFilmReview = (id) => {
   return axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${key}&language=en-US&page=1`)
}




export {getTrends,getFilms,getFilmInfo,getFilmCast,getFilmReview}