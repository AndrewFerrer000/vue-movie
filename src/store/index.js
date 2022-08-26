import { createStore } from 'vuex'
import axios from "axios"

export default createStore({
  state: {
    apiKey: 'b43b1dbab4ea9fb0ea4acb0101b1d758',
    thumbRootURL: 'http://image.tmdb.org/t/p/w500/',
    backdropRootUrl: 'http://image.tmdb.org/t/p/w1280/',
    castImageRootUrl: 'https://image.tmdb.org/t/p/w185/',
    movies: [],
    movieDetails: [],
    genres: [],
  },
  mutations: {
    SET_MOVIE(state, payload) {
      return state.movies = payload
    },
    SET_MOVIE_DETAILS(state, payload) {
      return state.movieDetails = payload;
    },
    SET_GENRE(state, payload) {
      return state.genres = payload
    }
  },
  actions: {
    async getGenres(context) {
      const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${context.state.apiKey}&language=en-US`);
      context.commit("SET_GENRE", response.data.genres)
    },
    async getMovies(context, page = 1) {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${context.state.apiKey}&page=${page}`)
      context.commit("SET_MOVIE", response.data);
    },
    async searchMovies(context, {keyword, page = 1}) {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${context.state.apiKey}&page=${page}&query=${keyword}`);
      context.commit("SET_MOVIE", response.data);
    },
    async getMovieDetails(context, payload) {
      const details = await axios.get(`https://api.themoviedb.org/3/movie/${payload}?api_key=${context.state.apiKey}`);
      const cast = await axios.get(`https://api.themoviedb.org/3/movie/${payload}/credits?api_key=${context.state.apiKey}`)
      const gallery = await axios.get(`https://api.themoviedb.org/3/movie/${payload}/images?api_key=${context.state.apiKey}`)
      const movieDetails = {...details.data, casts:cast.data.cast, gallery:gallery.data.backdrops};
      context.commit("SET_MOVIE_DETAILS", movieDetails);
    }
  } ,
  modules: {
  }
})
