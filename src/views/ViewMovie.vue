<template>
  <!-- Watch Trailer Pop-up -->
  <teleport to="body">
    <div
      @click.self="playTrailer = false"
      v-if="playTrailer"
      class="absolute top-0 left-0 flex items-center justify-center w-full h-screen bg-[#34495e] bg-opacity-70 filter backdrop-blur-sm z-50"
    >
      <div class="w-2/3 h-4/5">
        <iframe
          class="w-full h-full"
          :src="`https://www.youtube.com/embed/${firstTrailerDetails.key}?autoplay=1&mute=1&subtitle=1&enablejsapi=1`"
          :name="firstTrailerDetails.name"
          scrolling="No"
        ></iframe>
      </div>
    </div>
  </teleport>
  <div v-if="!isLoading && movieDetails" class="w-full h-full">
    <!-- Background -->
    <div
      class="relative bg-cover bg-center bg-no-repeat w-full h-4/5 overflow-hidden"
      :style="`background-image: url(${
        $store.state.backdropRootUrl + movieDetails.backdrop_path
      })`"
    >
      <div
        class="flex absolute top-0 left-0 w-full h-full bg-[#2c3e50] bg-opacity-60"
      >
        <!-- Details -->
        <div class="flex flex-col mx-0 my-auto gap-y-5 text-white w-1/2 px-28">
          <div
            @click="$router.back(1)"
            class="text-white text-5xl self-start cursor-pointer hover:text-green-500 hover:scale-75 transition duration-200 ease-in"
          >
            <i class="bx bx-arrow-back"></i>
          </div>
          <h1 class="flex items-center gap-x-5 text-5xl font-bold">
            {{ movieDetails.title
            }}<span
              class="text-sm text-gray-400 uppercase font-semibold tracking-widest"
              >[<span class="italic">{{ movieDetails.status }}</span
              >]</span
            >
          </h1>
          <h4 class="text-3xl font-semibold line-clamp-1">
            {{ movieDetails.tagline }}
          </h4>
          <p>{{ formatDate(movieDetails.release_date) }}</p>
          <div class="flex flex-wrap gap-5">
            <span
              class="px-6 py-1.5 bg-green-500 bg-opacity-70 border-2 border-green-500 rounded-lg"
              v-for="genre in movieDetails.genres"
              :key="genre"
              >{{ genre.name }}</span
            >
          </div>
          <p class="mt-5 text-3xl font-thin line-clamp-6">
            {{ movieDetails.overview }}
          </p>
          <div class="flex items-center gap-x-5 text-2xl">
            <h3>Vote average:</h3>
            <i class="bx bxs-star text-green-500"></i>
            <span>{{ twoDecimal }} / 10</span>
          </div>
          <div class="flex items-center gap-x-5 text-2xl">
            <h3>Vote count:</h3>
            <i class="bx bxs-upvote ml-5 text-blue-500"></i>
            <span>{{ movieDetails.vote_count }}</span>
          </div>
        </div>

        <!-- Action button -->
        <div
          class="flex flex-col items-center justify-center gap-y-10 text-white w-1/2 h-full px-28"
        >
          <button
            v-if="firstTrailerDetails"
            @click="playTrailer = true"
            type="button"
            class="flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity duration-200 ease-in-out"
          >
            <i
              class="bx bx-play-circle text-8xl hover:scale-90 transition-transform duration-300"
            ></i>
            <span class="text-3xl uppercase">Watch Trailer</span>
          </button>
          <a
            v-if="movieDetails.homepage"
            :href="movieDetails.homepage"
            target="_blank"
            class="flex items-center gap-x-5 rounded-lg py-4 px-16 text-2xl bg-white bg-opacity-10 hover:bg-opacity-80 hover:text-[#34495e] transition duration-300 ease-in-out"
          >
            <i class="bx bx-globe"></i>
            <span>Visit Homepage</span>
          </a>
          <button
            v-if="!isAdded"
            @click="addList(movieDetails.id)"
            type="button"
            class="flex items-center gap-x-5 rounded-lg py-4 px-16 text-2xl bg-white bg-opacity-10 hover:bg-opacity-80 hover:text-[#34495e] transition duration-300 ease-in-out"
          >
            <i class="bx bx-heart text-red-500"></i>
            <span>Add to my list</span>
          </button>
          <button
            v-else
            @click="removeList(movieDetails.id)"
            type="button"
            class="flex items-center gap-x-5 rounded-lg py-4 px-16 text-2xl bg-white bg-opacity-10 hover:bg-opacity-80 hover:text-[#34495e] transition duration-300 ease-in-out"
          >
            <i class="bx bxs-heart text-red-500"></i>
            <span>Remove to my list</span>
          </button>
        </div>
      </div>
    </div>
    <!-- Actor -->
    <div
      v-if="movieDetails.credits.cast.length != []"
      class="w-full h-auto px-28 py-10 overflow-hidden"
    >
      <h1 class="text-4xl mb-5">Cast</h1>
      <div
        ref="toggleHeight"
        class="w-full flex flex-wrap justify-evenly gap-10 overflow-hidden"
        :class="[toggleCast ? 'h-auto' : 'h-[12rem]']"
      >
        <div
          :class="{ hidden: !cast.profile_path }"
          class="flex w-[23rem] h-48 bg-gray-200 rounded-lg shadow-lg"
          v-for="cast in movieDetails.credits.cast"
          :key="cast"
        >
          <div class="w-2/4 h-full">
            <img
              v-if="cast.profile_path"
              class="w-full h-full rounded-tl-lg rounded-bl-lg"
              :src="$store.state.backdropRootUrl + cast.profile_path"
              :alt="cast.name"
            />
            <img
              v-else
              class="w-full h-full rounded-tl-lg rounded-bl-lg"
              src="@/assets/no-img.jpg"
              :alt="cast.name"
            />
          </div>
          <div class="w-full flex flex-col items-center justify-center px-2">
            <p class="font-semibold text-xl">{{ cast.name }}</p>
            <p class="font-thin italic">as</p>
            <p class="text-lg text-center">{{ cast.character }}</p>
          </div>
        </div>
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

    <div v-if="similarMovies.total_results != 0" class="w-full py-5 px-28">
      <!-- Card Container -->
      <h1 class="text-4xl mb-5">Similar Movies</h1>
      <div class="flex flex-wrap justify-center gap-8">
        <!-- Individual Card -->
        <movie-card
          :movies="similarMovies"
          :genres="$store.state.genres"
        ></movie-card>
      </div>
    </div>
  </div>

  <!-- Loader -->
  <div v-else-if="isLoading" class="w-full h-full text-center pt-20">
    <div class="flex items-center justify-center gap-5">
      <i
        class="bx bx-loader-alt text-5xl font-bold text-green-500 animate-spin"
      ></i>
      <p class="tracking-widest text-3xl">Loading...</p>
    </div>
  </div>

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
import MovieCard from "@/components/MovieCard.vue";

export default {
  components: {
    MovieCard,
  },
  data() {
    return {
      isLoading: true,
      isAdded: false,
      errorMsg: null,
      movieDetails: [],
      similarMovies: [],
      toggleCast: false,
      playTrailer: false,
    };
  },
  async mounted() {
    try {
      await this.$store.dispatch("getMovieDetails", this.$route.params.id);
      await this.$store.dispatch("getSimilarMovies", this.$route.params.id);
    } catch (error) {
      this.errorMsg = error.message;
    } finally {
      this.movieDetails = this.$store.state.movieDetails.data;
      this.similarMovies = this.$store.state.similarMovies;
      this.isLoading = false;
    }
    this.toggleAddRemoveBtn();
  },
  methods: {
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
    removeList(id) {
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
      const list = JSON.parse(localStorage.getItem("mylist")) || null;
      if (list) {
        if (list.find((id) => id === this.movieDetails.id)) this.isAdded = true;
        else this.isAdded = false;
      }
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
  },
};
</script>

<style></style>
