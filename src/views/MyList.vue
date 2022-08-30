<template>
  <div class="mylist flex flex-col gap-y-10">
    <h1
      class="flex items-center gap-x-2 text-3xl font-semibold mt-10 lg:mx-72 pb-5 border-b-2"
    >
      <span>My List </span><i class="bx bxs-heart text-red-500"></i>
    </h1>
    <div class="w-full py-5 lg:px-72">
      <!-- Card Container -->
      <div class="flex flex-wrap justify-start gap-y-8 gap-x-12">
        <!-- Individual Card -->
        <movie-card :movies="movies"></movie-card>
      </div>
    </div>
  </div>
</template>

<script>
import MovieCard from "@/components/MovieCard.vue";

export default {
  components: {
    MovieCard,
  },
  data() {
    return {
      movies: [],
    };
  },
  mounted() {
    this.loadList();
  },
  methods: {
    async loadList() {
      await this.$store.dispatch("getMovieList");
      this.movies = this.$store.state.user.movieList;
    },
  },
};
</script>

<style></style>
