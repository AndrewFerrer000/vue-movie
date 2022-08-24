import { createStore } from 'vuex'
import axios from "axios"

export default createStore({
  state: {
    apiKey: 'b43b1dbab4ea9fb0ea4acb0101b1d758',
    thumbRootURL: 'http://image.tmdb.org/t/p/w500/',
    movies: [],
  },
  mutations: {
    SET_MOVIE(state, payload) {
      return state.movies = payload
    }
  },
  actions: {
    async getMovies(context, page = 1) {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${context.state.apiKey}&page=${page}`)
      context.commit("SET_MOVIE", response.data.results);
    },
    async searchMovies(context, {keyword, page = 1}) {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${context.state.apiKey}&page=${page}&query=${keyword}`);
      context.commit("SET_MOVIE", response.data.results);
    }
  } ,
  modules: {
  }
})
