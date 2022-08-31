<template>
  <div v-if="!isLoading" class="home">
    <!--Search and Filter -->
    <div class="w-full flex flex-col gap-y-4 items-center justify-center h-72">
      <h1 class="text-2xl mb-5 text-center px-5">
        Browse your favorites movie here in
        <span class="font-semibold"
          ><span class="text-green-500">Vue</span> Movie</span
        >
      </h1>
      <!-- Search -->
      <div class="w-72 md:w-96 relative flex mb-4">
        <div
          class="px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight rounded-tl rounded-bl flex items-center"
        >
          <i class="bx bx-search text-2xl"></i>
        </div>
        <input
          autocomplete="on"
          @keyup="searchMovies"
          v-model="keyword"
          type="text"
          class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded-tr rounded-br transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon2"
        />
      </div>
      <p v-if="searchErrorMsg" class="text-2xl">{{ searchErrorMsg }}</p>
      <!-- Filter -->
      <!-- <div class="w-1/4 flex justify-around">
        <div>
          <label class="font-semibold text-gray-500">Genre:</label>
          <select
            class="form-select block w-full px-3 py-1.5 mt-1 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
            aria-label="Disabled select example"
            aria-placeholder="Open this select menu"
          >
            <option selected>All</option>
            <option v-for="genre in $store.state.genres" :key="genre.id">
              {{ genre.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="font-semibold text-gray-500">Order by:</label>
          <select
            class="form-select block w-full px-3 py-1.5 mt-1 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
            aria-label="Disabled select example"
            aria-placeholder="Open this select menu"
          >
            <option selected>All</option>
            <option value="1">Release ↑</option>
            <option value="1">Release ↓</option>
            <option value="2">Rating ↑</option>
            <option value="2">Rating ↓</option>
          </select>
        </div>
      </div> -->
    </div>
    <div class="w-full py-5 lg:px-1">
      <!-- Card Container -->
      <div class="flex flex-wrap justify-center gap-8 lg:gap-4">
        <!-- Individual Card -->
        <movie-card :movies="movies" :genres="$store.state.genres"></movie-card>
      </div>
      <!-- Pagination -->
      <div v-if="!searchErrorMsg" class="w-full p-6">
        <div class="flex justify-center">
          <nav aria-label="Page navigation example">
            <ul class="flex list-style-none">
              <li
                v-if="currentPage > 1"
                class="page-item"
                @click="previousPage"
              >
                <a
                  class="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                  href="#"
                  aria-disabled="true"
                  >Previous</a
                >
              </li>
              <li v-else class="page-item disabled">
                <a
                  class="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-500 pointer-events-none focus:shadow-none"
                  href="#"
                  tabindex="-1"
                  aria-disabled="true"
                  >Previous</a
                >
              </li>
              <li class="page-item active">
                <input
                  class="page-link appearance-none relative block w-10 text-center py-1.5 border-0 bg-green-600 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-green-600 shadow-md focus:shadow-md"
                  type="number"
                  v-model="currentPage"
                  @change="loadMovies(currentPage)"
                />
              </li>
              <li v-if="currentPage >= totalPage" class="page-item disabled">
                <a
                  class="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-500 pointer-events-none focus:shadow-none"
                  href="#"
                  tabindex="-1"
                  aria-disabled="true"
                  >Next</a
                >
              </li>
              <li v-else class="page-item" @click="nextPage">
                <a
                  class="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                  href="#"
                  >Next</a
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="isLoading" class="w-full h-full text-center pt-20">
    <div class="flex items-center justify-center gap-5">
      <i
        class="bx bx-loader-alt text-5xl font-bold text-green-500 animate-spin"
      ></i>
      <p class="tracking-widest text-3xl">Loading...</p>
    </div>
  </div>

  <div v-else class="w-full h-full text-center pt-20">
    <h1 class="text-3xl">
      {{ errorMsg }}
      <a
        @click="$router.back(1)"
        class="text-green-500 font-semibold hover:underline cursor-pointer"
        >Go back</a
      >
    </h1>
  </div>
</template>

<script>
import MovieCard from "@/components/MovieCard.vue";

export default {
  name: "HomeView",
  components: {
    MovieCard,
  },
  data() {
    return {
      isLoading: true,
      errorMsg: null,
      searchErrorMsg: null,
      movies: [],
      currentPage: 1,
      totalPage: 0,
      keyword: "",
    };
  },
  async mounted() {
    await this.loadMovies(this.$route.query.page);
  },
  watch: {
    "$route.query"(newQuery) {
      if (this.$route.name == "home") {
        this.loadMovies(newQuery.page);
      }
      if (this.$route.name == "search") {
        this.searchMovies(newQuery.page);
      }
    },
  },
  methods: {
    async loadMovies(page) {
      try {
        await this.$store.dispatch("getMovies", page);
      } catch (error) {
        this.errorMsg = error.message;
        this.isLoading = null;
      } finally {
        this.movies = this.$store.state.movies;
        this.currentPage = this.movies.page;
        this.totalPage = this.movies.total_pages;
        this.isLoading = false;

        if (this.totalPage != 0) {
          this.searchErrorMsg = null;
        }
      }
    },

    async searchMovies(page) {
      if (this.keyword === "") {
        this.$router.replace("/");
        this.loadMovies();
        return;
      }

      try {
        this.$router.replace({
          path: "/search",
          query: { keyword: this.keyword, page: this.$route.query.page },
        });
        await this.$store.dispatch("searchMovies", {
          keyword: this.keyword,
          page: page,
        });
      } catch (error) {
        this.searchErrorMsg = error.message;
      } finally {
        this.movies = this.$store.state.movies;
        this.currentPage = this.movies.page;
        this.totalPage = this.movies.total_pages;
      }

      if (this.totalPage != 0) {
        this.searchErrorMsg = null;
      }
    },

    previousPage() {
      this.$router.replace({
        query: { keyword: this.keyword, page: this.currentPage - 1 },
      });
    },

    nextPage() {
      this.$router.replace({
        query: { keyword: this.keyword, page: this.currentPage + 1 },
      });
    },
  },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
