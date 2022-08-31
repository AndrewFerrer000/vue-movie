import { createStore } from 'vuex'
import axios from "axios"
import router from '@/router'

export default createStore({
  state: {
    user: {
      movieList: [],
      data: [],
    },
    firebase: {
      apiKey: 'AIzaSyAn-80I0mdEvvt8oXdxMa2KqK_WyIrUAVg',
      endpoint: 'https://firebase.googleapis.com/',
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
    },
    SET_USERDATA(state, payload) {
      console.log(payload)
      return state.user.data = payload
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
        if (response.data.total_results <= 0) {
          throw new Error(`No results for the keyword: '${keyword}'`);
        }
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
    },
    async signupUser (context, {email, password}) {
      try {
        await axios({
          method: 'post',
          url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${context.state.firebase.apiKey}`,
          headers: {}, 
          data: {
            email: email,
            password: password,
            returnSecureToken: true,
          }
        });
      } catch (error) {
        switch (error.response.data.error.message) {
          case 'EMAIL_EXISTS':
            throw new Error('This email is already exist, try another email.')
        
          case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            throw new Error('Too many attempt, this account is temporarily disabled you can try again later.')

          default:
            throw new Error('Something went wrong, please try again later or contact admin.')
        }
      }
    },
    async signinUser (context, {email, password}) {
      try {
        const response = await axios({
          method: 'post',
          url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${context.state.firebase.apiKey}`,
          headers: {}, 
          data: {
            email: email,
            password: password,
          }
        });

        localStorage.setItem("userdata", JSON.stringify(response.data));
        router.push('/');
        context.commit("SET_USERDATA", JSON.parse(localStorage.getItem("userdata")));
      } catch (error) {
        switch (error.response.data.error.message) {
          case 'EMAIL_NOT_FOUND':
            throw new Error('Email or password is incorrect, Please try again.')

          case 'INVALID_PASSWORD':
            throw new Error('Email or password is incorrect, Please try again.')

          case 'INVALID_EMAIL':
            throw new Error('Email or password is incorrect, Please try again.')

          case 'USER_DISABLED':
            throw new Error('This account has been disabled, please contact the admin.')

          case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            throw new Error('Too many attempt, this account is temporarily disabled you can try again later.')

          default:
            throw new Error('Something went wrong, please try again later or contact admin.')
        }
      }
    }
  },
  modules: {
  }
})
