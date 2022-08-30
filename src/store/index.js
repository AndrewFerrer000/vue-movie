import { createStore } from 'vuex'
import axios from "axios"

export default createStore({
  state: {
    user: {
      movieList: [],
    },
    apiKey: 'b43b1dbab4ea9fb0ea4acb0101b1d758',
    thumbRootURL: 'http://image.tmdb.org/t/p/w500/',
    backdropRootUrl: 'http://image.tmdb.org/t/p/w1280/',
    castImageRootUrl: 'https://image.tmdb.org/t/p/w185/',
    movies: [],
    movieDetails: [],
    similarMovies: [],
    genres: [],
  },
  mutations: {
    SET_MOVIE(state, payload) {
      return state.movies = payload;
    },
    SET_MOVIE_DETAILS(state, payload) {
      return state.movieDetails = payload;
    },
    SET_GENRE(state, payload) {
      return state.genres = payload;
    },
    SET_MOVIELIST(state, payload) {
      return state.user.movieList = payload;
    },
    SET_SIMILARMOVIES(state, payload) {
      return state.similarMovies = payload;
    }
  },
  actions: {
    async getGenres(context) {
      const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${context.state.apiKey}&language=en-US`);
      context.commit("SET_GENRE", response.data.genres);
    },
    async getMovies(context, page = 1) {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${context.state.apiKey}&page=${page}`);
      context.commit("SET_MOVIE", response.data);
    },
    async searchMovies(context, {keyword, page = 1}) {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${context.state.apiKey}&page=${page}&query=${keyword}`);
      context.commit("SET_MOVIE", response.data);
    },
    async getMovieDetails(context, payload) {
        try {
          const getDetails = await axios.get(`https://api.themoviedb.org/3/movie/${payload}?api_key=${context.state.apiKey}&append_to_response=videos,credits,images`);
          context.commit("SET_MOVIE_DETAILS", getDetails);
        } catch (error) {
          throw new Error("Sorry! this movie does not exist.");
        }
    },
    async getSimilarMovies(context, payload) {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${payload}/similar?api_key=${context.state.apiKey}&page=1`)
      context.commit("SET_SIMILARMOVIES", response.data);
    },
    async getMovieList(context) {
      const localList = JSON.parse(localStorage.getItem("mylist"));
      const newList = [];
      for (const id of localList) {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${context.state.apiKey}`);
        newList.push(response.data);
      }
      context.commit("SET_MOVIELIST", {results: newList});
    }
  },
  modules: {
  }
})
