<template>
  <div class="mylist flex flex-col gap-y-10 px-10">
    <div
      v-if="!isAuth"
      class="w-full bg-yellow-300 mt-5 py-5 px-10 rounded-lg border-2 border-yellow-500 shadow-lg"
    >
      <span class="text-red-500 font-bold text-lg">Warning:</span> Your movie
      list is saved locally to avoid losing data, please
      <router-link
        :to="{ name: 'sign-in' }"
        class="underline font-semibold text-green-500 hover:text-white"
        >sign in</router-link
      >
      your account
    </div>
    <h1 class="flex items-center gap-x-2 text-3xl font-semibold mt-5">
      <span>My List </span><i class="bx bxs-heart text-red-500" />
    </h1>
    <div class="w-full py-5">
      <!-- Card Container -->
      <div class="flex flex-wrap justify-evenly gap-8">
        <!-- Individual Card -->
        <CMovieCard
          :movie="movie"
          v-for="(movie, index) in movies.results"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CMovieCard from "@/components/CMovieCard.vue";

export default {
  components: {
    CMovieCard,
  },
  data() {
    return {
      movies: [],
    };
  },
  mounted() {
    this.loadList();
  },
  computed: {
    isAuth() {
      return this.$store.state.isAuthenticated;
    },
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
