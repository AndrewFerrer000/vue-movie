<template>
  <div class="home">
    <!--Search and Filter -->
    <div class="w-full flex flex-col gap-y-4 items-center justify-center h-72">
      <h1 class="text-2xl mb-5">Browse your favorites movie here in <span class="font-semibold"><span class="text-green-500">Vue</span> Movie</span></h1>
      <!-- Search -->
      <div class="w-1/4 relative flex mb-4">
        <div class="px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight rounded-tl rounded-bl flex items-center">
          <i class='bx bx-search text-2xl' ></i>
        </div>
        <input @keyup="searchMovies" v-model="keyword" type="search" class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded-tr rounded-br transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2">
      </div>
      <!-- Filter -->
      <div class="w-1/4 flex justify-around">
        <div>
          <label class="font-semibold text-gray-500">Genre:</label>
          <select class="form-select
            block
            w-full
            px-3
            py-1.5
            mt-1
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none" aria-label="Disabled select example" aria-placeholder="Open this select menu">
              <option selected>All</option>
              <option value="1">Action</option>
              <option value="2">Horror</option>
              <option value="3">Drama</option>
              <option value="4">Fantasy</option>
              <option value="5">Fiction</option>
          </select>
        </div>
        <div>
          <label class="font-semibold text-gray-500">Order by:</label>
          <select class="form-select
            block
            w-full
            px-3
            py-1.5
            mt-1
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none" aria-label="Disabled select example" aria-placeholder="Open this select menu">
              <option selected>All</option>
              <option value="1">Release ↑</option>
              <option value="1">Release ↓</option>
              <option value="2">Rating ↑</option>
              <option value="2">Rating ↓</option>
          </select>
        </div>
      </div>
    </div>
    <div class="w-full py-5 px-32">
      <!-- Card Container -->
      <div class="flex flex-wrap justify-center gap-8">
        <!-- Individual Card -->
        <div class=" overflow-hidden w-56 h-auto" v-for="movie in movies" :key="movie">
          <!-- Image -->
          <div class="relative overflow-hidden bg-no-repeat bg-cover rounded-lg">
            <img v-if="movie.poster_path" :src='$store.state.thumbRootURL + movie.poster_path' class="hover:scale-110 transition duration-300 ease-in-out" :alt="movie.title" />
            <img v-else src='@/assets/no-img.jpg' class="h-full hover:scale-110 transition duration-300 ease-in-out" :alt="movie.title" />
          </div>
          <div class="p-2">
            <h5 class="text-gray-900 text-xl font-medium mb-2 truncate">{{ movie.title }}</h5>
            <p class="text-gray-700 text-base mb-4">{{ formatData(movie.release_date) }}</p>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="w-full p-6">
        <div class="flex justify-center">
          <nav aria-label="Page navigation example">
            <ul class="flex list-style-none">
              <li class="page-item disabled"><a
                  class="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-500 pointer-events-none focus:shadow-none"
                  href="#" tabindex="-1" aria-disabled="true">Previous</a></li>
              <li class="page-item"><a
                  class="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                  href="#">1</a></li>
              <li class="page-item active"><a
                  class="page-link relative block py-1.5 px-3 border-0 bg-green-600 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-green-600 shadow-md focus:shadow-md"
                  href="#">2</a></li>
              <li class="page-item"><a
                  class="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                  href="#">3</a></li>
              <li class="page-item"><a
                  class="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                  href="#">Next</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'HomeView',
  data() {
    return {
      movies: [],
      keyword: '',
    }
  },
  async mounted() {
    this.loadMovies()
  },
  methods: {
    async loadMovies(page) {
      await this.$store.dispatch("getMovies", page);
      this.movies = this.$store.state.movies;
    },
    formatData(date) {
      return moment(date).format("MMMM YYYY");
    },
    async searchMovies() {
      if(this.keyword === '') return this.loadMovies();
      await this.$store.dispatch("searchMovies", {keyword: this.keyword});
      this.movies = this.$store.state.movies; 
    }
  }
}
</script>
