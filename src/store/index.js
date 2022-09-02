import { createStore } from "vuex";
import axios from "axios";
import router from "@/router";

// Themoviedb.api
const MOVIE_API_KEY = "b43b1dbab4ea9fb0ea4acb0101b1d758";
const MOVIE_API_ENDPOINT = "https://api.themoviedb.org/3";

// Firebase
const FIREBASE_API_KEY = "AIzaSyAn-80I0mdEvvt8oXdxMa2KqK_WyIrUAVg";
const FIREBASE_DATABASE_ENDPOINT =
  "https://vue-movie-2e749-default-rtdb.firebaseio.com";
const FIREBASE_AUTH_ERROR_CODE = {
  EMAIL_EXISTS: "This email is already exist, try another email.",
  WEAK_PASSWORD: "Password should be at least 6 characters.",
  TOO_MANY_ATTEMPTS_TRY_LATER:
    "Too many attempt, this account is temporarily disabled you can try again later.",
  EMAIL_NOT_FOUND: "Email or password is incorrect, Please try again.",
  INVALID_PASSWORD: "Email or password is incorrect, Please try again.",
  INVALID_EMAIL: "Email or password is incorrect, Please try again.",
  USER_DISABLED: "This account has been disabled, please contact the admin.",
};

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
    SET_USERDATA(state, payload) {
      state.isAuthenticated = true;
      localStorage.setItem("userdata", JSON.stringify(payload));
      state.user.data = payload;
    },
    CLEAR_USER(state) {
      state.isAuthenticated = false;
      localStorage.removeItem("userdata");
      state.user.data = null;
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

    async getMovieList({ commit }) {
      const localList = JSON.parse(localStorage.getItem("mylist")) || [];
      const newList = [];
      for (const id of localList) {
        const { data } = await axios.get(
          `${MOVIE_API_ENDPOINT}/movie/${id}?api_key=${MOVIE_API_KEY}`
        );
        newList.push(data);
      }
      commit("SET_MOVIELIST", { results: newList });
    },

    async signupUser({ commit }, { email, password }) {
      try {
        const response = await axios({
          method: "post",
          url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
          headers: {},
          data: {
            email: email,
            password: password,
            returnSecureToken: true,
          },
        });

        const getUserData = await axios({
          method: "post",
          headers: {},
          url: `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`,
          data: {
            idToken: response.data.idToken,
          },
        });
        // save to firebase database
        axios({
          method: "PUT",
          url: `${FIREBASE_DATABASE_ENDPOINT}/users/${getUserData.data.users[0].localId}.json`,
          data: JSON.stringify(getUserData.data.users[0]),
        });
        localStorage.setItem("userdata", JSON.stringify(response.data));
        commit("SET_USERDATA", JSON.parse(localStorage.getItem("userdata")));
      } catch (error) {
        throw new Error(
          FIREBASE_AUTH_ERROR_CODE[error.response.data.error.message] ||
            "Something went wrong, please try again later or contact admin."
        );
      }
    },

    async signinUser({ commit }, { email, password }) {
      try {
        const { data } = await axios({
          method: "post",
          url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
          headers: {},
          data: {
            email: email,
            password: password,
          },
        });

        router.push("/");
        localStorage.setItem("userdata", JSON.stringify(data));
        commit("SET_USERDATA", JSON.parse(localStorage.getItem("userdata")));
      } catch (error) {
        throw new Error(
          FIREBASE_AUTH_ERROR_CODE[error.response.data.error.message] ||
            "Something went wrong, please try again later or contact admin."
        );
      }
    },
  },
  modules: {},
});
