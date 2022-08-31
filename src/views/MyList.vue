<template>
  <div class="mylist flex flex-col gap-y-10 px-10">
    <h1 class="flex items-center gap-x-2 text-3xl font-semibold mt-10">
      <span>My List </span><i class="bx bxs-heart text-red-500"></i>
    </h1>
    <div class="w-full py-5">
      <!-- Card Container -->
      <div class="flex flex-wrap justify-evenly gap-8">
        <!-- Individual Card -->
        <movie-card :movies="movies" :genres="$store.state.genres"></movie-card>
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
      const temp = this.$store.state.user.movieList.results;
      let newList = [];

      // separate all the id in genre object and store it in genre_ids
      temp.forEach((item) => {
        let getIds = [];
        item.genres.forEach(({ id }) => {
          getIds.push(id);
        });
        newList.push({ ...item, genre_ids: getIds });
      });
      this.isEmpty = false;
      // make sure to store it in object with the key name 'results'
      this.movies = { results: newList };
    },
  },
};
</script>

<style></style>
