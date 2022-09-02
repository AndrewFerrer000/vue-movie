<template>
  <!-- Watch Trailer Pop-up -->
  <CPreviewTrailer
    :trailerDetails="firstTrailerDetails"
    v-if="openTrailer"
    @closeTrailer="closeTrailer"
  />
  <div v-if="!isLoading && movieDetails" class="w-full h-full">
    <!-- Background -->
    <div
      class="relative bg-cover bg-center bg-no-repeat w-full h-screen overflow-hidden"
      :style="{
        backgroundImage: `url(${backdrop + movieDetails.backdrop_path})`,
      }"
    >
      <div
        class="flex flex-col xl:flex-row absolute top-0 left-0 w-full h-full bg-[#2c3e50] bg-opacity-60"
      >
        <!-- Details -->
        <div
          class="flex flex-col mx-0 my-auto gap-y-2 lg:gap-y-5 text-white w-full px-10 py-5 xl:px-28"
        >
          <div
            @click="$router.back(1)"
            class="text-white text-3xl xl:text-5xl self-start cursor-pointer hover:text-green-500 hover:scale-75 transition duration-200 ease-in"
          >
            <i class="bx bx-arrow-back" />
          </div>
          <h1
            class="flex flex-col xl:flex-row items-center gap-x-5 text-3xl lg:text-5xl font-bold"
          >
            {{ movieDetails.title
            }}<span
              class="hidden lg:block text-sm text-gray-400 uppercase font-semibold tracking-widest"
              >[<span class="italic">{{ movieDetails.status }}</span
              >]</span
            >
          </h1>
          <h4 class="hidden lg:block text-3xl font-semibold">
            {{ movieDetails.tagline }}
          </h4>
          <p>{{ formatDate(movieDetails.release_date) }}</p>
          <div class="flex flex-wrap gap-5 text-sm lg:text-base">
            <span
              class="px-6 py-1.5 bg-green-500 bg-opacity-70 border-2 border-green-500 rounded-lg"
              v-for="genre in movieDetails.genres"
              :key="genre"
              >{{ genre.name }}</span
            >
          </div>
          <p class="mt-5 text-xl lg:text-3xl font-thin line-clamp-4">
            {{ movieDetails.overview }}
          </p>
          <div class="flex items-center gap-x-5 text-base lg:text-2xl">
            <h3>Vote average:</h3>
            <i class="bx bxs-star text-green-500" />
            <span>{{ twoDecimal }} / 10</span>
          </div>
          <div class="flex items-center gap-x-5 text-base lg:text-2xl">
            <h3>Vote count:</h3>
            <i class="bx bxs-upvote ml-5 text-blue-500" />
            <span>{{ movieDetails.vote_count }}</span>
          </div>
        </div>

        <!-- Action button -->
        <div
          class="flex flex-col items-center justify-center gap-y-10 text-white w-full h-1/2 xl:w-1/2 xl:h-full lg:px-28"
        >
          <button
            v-if="firstTrailerDetails"
            @click="openTrailer = true"
            type="button"
            class="flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity duration-200 ease-in-out"
          >
            <i
              class="bx bx-play-circle text-5xl lg:text-8xl hover:scale-90 transition-transform duration-300"
            />
            <span class="text-3xl uppercase">Watch Trailer</span>
          </button>
          <a
            v-if="movieDetails.homepage"
            :href="movieDetails.homepage"
            target="_blank"
            class="flex items-center gap-x-5 rounded-lg py-2 lg:py-4 px-8 lg:px-16 text-base lg:text-2xl bg-white bg-opacity-10 hover:bg-opacity-80 hover:text-[#34495e] transition duration-300 ease-in-out"
          >
            <i class="bx bx-globe" />
            <span>Visit Homepage</span>
          </a>
          <button
            v-if="!isAdded"
            @click="addList(movieDetails.id)"
            type="button"
            class="flex items-center gap-x-5 rounded-lg py-2 lg:py-4 px-8 lg:px-16 text-base lg:text-2xl bg-white bg-opacity-10 hover:bg-opacity-80 hover:text-[#34495e] transition duration-300 ease-in-out"
          >
            <i class="bx bx-heart text-red-500" />
            <span>Add to my list</span>
          </button>
          <button
            v-else
            @click="removeList(movieDetails.id)"
            type="button"
            class="flex items-center gap-x-5 rounded-lg py-2 lg:py-4 px-8 lg:px-16 text-base lg:text-2xl bg-white bg-opacity-10 hover:bg-opacity-80 hover:text-[#34495e] transition duration-300 ease-in-out"
          >
            <i class="bx bxs-heart text-red-500" />
            <span>Remove to my list</span>
          </button>
        </div>
      </div>
    </div>
    <!-- Actor -->
    <div
      v-if="movieDetails.credits.cast.length != []"
      class="w-full h-auto px-10 lg:px-28 py-10 overflow-hidden"
    >
      <h1 class="text-4xl mb-5">Cast</h1>
      <div
        ref="toggleHeight"
        class="w-full flex flex-wrap justify-evenly gap-5 lg:gap-10 overflow-hidden"
        :class="[toggleCast ? 'h-auto' : 'h-[12rem]']"
      >
        <CCastCard
          v-for="(cast, index) in movieDetails.credits.cast"
          :castDetails="cast"
          :key="index"
        />
      </div>
      <div
        class="w-full h-auto mt-10 text-center rounded-lg bg-green-100 hover:bg-green-400 hover:text-white transition-colors duration-150 ease-in-out"
      >
        <button
          @click="toggleCast = !toggleCast"
          type="button"
          class="w-full py-5 tracking-widest"
        >
          <span v-if="!toggleCast">See more...</span>
          <span v-else>...See less</span>
        </button>
      </div>
    </div>
    <!-- Similar Movies -->
    <div
      v-if="similarMovies.total_results != 0"
      class="w-full py-5 px-10 lg:px-28"
    >
      <!-- Card Container -->
      <h1 class="text-4xl mb-5">Similar Movies</h1>
      <div class="flex flex-wrap justify-center gap-8">
        <!-- Individual Card -->
        <CMovieCard
          v-for="(similar, index) in similarMovies.results"
          :key="index"
          :movie="similar"
        />
      </div>
    </div>
  </div>

  <!-- Loader -->
  <CLoader v-else-if="isLoading" />

  <!-- Error Message -->
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
import moment from "moment";
import CMovieCard from "@/components/CMovieCard.vue";
import CLoader from "@/components/CLoader.vue";
import CPreviewTrailer from "@/components/CPreviewTrailer.vue";
import CCastCard from "@/components/CCastCard.vue";

import { mapState } from "vuex";

export default {
  components: {
    CMovieCard,
    CLoader,
    CPreviewTrailer,
    CCastCard,
  },
  data() {
    return {
      isLoading: true,
      isAdded: false,
      errorMsg: null,
      toggleCast: false,
      openTrailer: false,
    };
  },
  watch: {
    "$route.params.id": function () {
      this.loadMovies();
      this.isAdded = false;
    },
  },
  async mounted() {
    this.loadMovies();
  },
  methods: {
    async loadMovies() {
      try {
        if (this.$route.params.id) {
          await this.$store.dispatch("getMovieDetails", this.$route.params.id);
          await this.$store.dispatch("getSimilarMovies", this.$route.params.id);
        }
      } catch (error) {
        this.errorMsg = error.message;
      } finally {
        this.isLoading = false;
      }
      this.toggleAddRemoveBtn();
    },
    formatDate(date) {
      return moment(date).format("MMMM YYYY");
    },
    addList(id) {
      const mylist = JSON.parse(localStorage.getItem("mylist")) || [];
      if (mylist) {
        mylist.push(id);
        localStorage.setItem("mylist", JSON.stringify(mylist));
        this.toggleAddRemoveBtn();
      }
    },
    async removeList(id) {
      this.isAdded = false;
      const mylist = JSON.parse(localStorage.getItem("mylist")) || [];
      if (mylist) {
        const newList = mylist.filter((movieId) => movieId !== id);
        localStorage.setItem("mylist", JSON.stringify(newList));

        this.toggleAddRemoveBtn();
      }
    },
    async toggleAddRemoveBtn() {
      // update list in vuex every add and remove
      await this.$store.dispatch("getMovieList");
      // toggle buttons depend on statement
      const list = (await JSON.parse(localStorage.getItem("mylist"))) || [];

      list.forEach((id) => {
        if (id == this.movieDetails.id) {
          return (this.isAdded = true);
        }
      });
    },

    closeTrailer() {
      this.openTrailer = false;
    },
  },

  computed: {
    twoDecimal() {
      return Math.round(this.movieDetails.vote_average * 100) / 100;
    },
    firstTrailerDetails() {
      return this.movieDetails.videos.results.find(
        ({ type }) => type == "Trailer"
      );
    },

    ...mapState({
      backdrop: (state) => state.rootURL.backdrop,
      movieDetails: (state) => state.movieDetails.data,
      similarMovies: (state) => state.similarMovies,
    }),
  },
};
</script>
