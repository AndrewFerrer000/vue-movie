<template>
  <div
    class="flex flex-col justify-between overflow-hidden w-56 h-90"
    v-for="movie in movies.results"
    :key="movie"
  >
    <!-- Image -->
    <router-link
      :to="{ name: 'view-movie', params: { id: movie.id } }"
      class="thumb-image relative h-full overflow-hidden bg-no-repeat bg-cover rounded-lg border"
    >
      <img
        v-if="movie.poster_path"
        :src="$store.state.thumbRootURL + movie.poster_path"
        class="h-full object-cover hover:scale-110 hover:brightness-50 transition duration-300 ease-in-out"
        :alt="movie.title"
      />
      <img
        v-else
        src="@/assets/no-img.jpg"
        class="object-cover h-full hover:scale-110 transition duration-300 ease-in-out hover:brightness-50"
        :alt="movie.title"
      />
      <!-- Genre -->
      <div
        class="genre-list pointer-events-none w-full px-8 opacity-0 absolute top-5 left-1/2 -translate-x-1/2 h-8"
      >
        <p
          class="text-white text-2xl text-center mb-2"
          :class="{ hidden: index >= 3 }"
          v-for="(genreId, index) in movie.genre_ids"
          :key="genreId"
        >
          {{ genres.find(({ id }) => id === genreId).name }}
        </p>
      </div>
      <!-- Actions -->
      <div
        class="action pointer-events-none border-green-500 bg-green-500 bg-opacity-70 top-52 -right-10 transition-right"
      >
        <i class="bx bxs-star text-yellow-500"></i
        ><span class="font-semibold text-md text-white"
          >{{ movie.vote_average }} / 10</span
        >
      </div>
      <div
        class="action pointer-events-none border-blue-500 bg-blue-500 bg-opacity-70 top-64 -right-10 transition-right delay-100"
      >
        <i class="bx bxs-upvote text-green-500"></i
        ><span class="font-semibold text-md text-white">{{
          movie.vote_count
        }}</span>
      </div>
    </router-link>
    <div class="p-2">
      <h5 class="text-gray-900 text-xl font-medium mb-2 truncate">
        {{ movie.title }}
      </h5>
      <p class="text-gray-700 text-base mb-4">
        {{ formatDate(movie.release_date) }}
      </p>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["movies", "genres"],
  methods: {
    formatDate(date) {
      return moment(date).format("MMMM YYYY");
    },
  },
};
</script>

<style lang="postcss" scoped>
.action {
  @apply absolute flex items-center gap-2 rounded-tl-lg rounded-bl-lg border-2 px-5 py-1.5 opacity-0 duration-300 ease-in-out;
}

.thumb-image:hover .action {
  @apply right-0 opacity-100;
}

.thumb-image:hover .genre-list {
  @apply opacity-100 transition-opacity duration-300 ease-in-out;
}
</style>
