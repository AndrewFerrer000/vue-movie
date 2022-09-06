/* eslint-disable */
import { createStore } from "vuex";
import axios from "axios";

import { getData } from "@/firestore-contoller";

// Themoviedb.api
const MOVIE_API_KEY = "b43b1dbab4ea9fb0ea4acb0101b1d758";
const MOVIE_API_ENDPOINT = "https://api.themoviedb.org/3";

export default createStore({
  state: {
    isAuthenticated: false,
    user: {
      movieList: [],
      data: null,
    },
    rootURL: {
      thumb: "http://image.tmdb.org/t/p/w500",
      backdrop: "http://image.tmdb.org/t/p/w1280",
      castImage: "https://image.tmdb.org/t/p/w185",
    },
    movies: [],
    movieDetails: [],
    similarMovies: [],
    genres: [],
  },
  mutations: {
    SET_MOVIE(state, payload) {
      state.movies = payload;
    },
    SET_MOVIE_DETAILS(state, payload) {
      state.movieDetails = payload;
    },
    SET_GENRE(state, payload) {
      state.genres = payload;
    },
    SET_MOVIELIST({ user }, payload) {
      user.movieList = payload;
    },
    SET_SIMILARMOVIES(state, payload) {
      state.similarMovies = payload;
    },
    SET_USER(state, payload) {
      state.isAuthenticated = true;
      state.user.data = payload;
      localStorage.setItem("currentUser", JSON.stringify(payload));
    },
    CLEAR_USER(state) {
      state.isAuthenticated = false;
      state.user.data = null;
      localStorage.removeItem("currentUser");
    },
  },
  actions: {
    async getGenres({ commit }) {
      const { data } = await axios.get(
        `${MOVIE_API_ENDPOINT}/genre/movie/list?api_key=${MOVIE_API_KEY}&language=en-US`
      );
      commit("SET_GENRE", data.genres);
    },

    async getMovies({ commit }, page = 1) {
      const { data } = await axios.get(
        `${MOVIE_API_ENDPOINT}/discover/movie?api_key=${MOVIE_API_KEY}&page=${page}`
      );
      commit("SET_MOVIE", data);
    },

    async searchMovies({ commit }, { keyword, page = 1 }) {
      const { data } = await axios.get(
        `${MOVIE_API_ENDPOINT}/search/movie?api_key=${MOVIE_API_KEY}&page=${page}&query=${keyword}`
      );
      commit("SET_MOVIE", data);
      if (data.total_results <= 0) {
        throw new Error(`No results for the keyword: '${keyword}'`);
      }
    },

    async getMovieDetails({ commit }, payload) {
      try {
        const getDetails = await axios.get(
          `${MOVIE_API_ENDPOINT}/movie/${payload}?api_key=${MOVIE_API_KEY}&append_to_response=videos,credits,images`
        );
        commit("SET_MOVIE_DETAILS", getDetails);
      } catch {
        throw new Error("Sorry! this movie does not exist.");
      }
    },

    async getSimilarMovies({ commit }, payload) {
      const { data } = await axios.get(
        `${MOVIE_API_ENDPOINT}/movie/${payload}/similar?api_key=${MOVIE_API_KEY}&page=1`
      );
      commit("SET_SIMILARMOVIES", data);
    },

    async getMovieList({ commit, state }) {
      let movieList = [];
      if (state.isAuthenticated) {
        const DBMovieList = await getData(state.user.data.uid);
        movieList = DBMovieList || [];
      } else {
        movieList = JSON.parse(localStorage.getItem("mylist")) || [];
      }

      const newList = [];
      for (const id of movieList) {
        const { data } = await axios.get(
          `${MOVIE_API_ENDPOINT}/movie/${id}?api_key=${MOVIE_API_KEY}`
        );
        newList.push(data);
      }
      commit("SET_MOVIELIST", { results: newList });
    },
  },
});
