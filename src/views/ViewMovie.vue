<template>
  <div class="w-full h-full">
    <!-- Background -->
    <div class="relative bg-cover bg-center bg-no-repeat w-full h-4/5 overflow-hidden" :style="`background-image: url(${$store.state.backdropRootUrl + movieDetails.backdrop_path})`">
        <div class="flex absolute top-0 left-0 w-full h-full bg-[#2c3e50] bg-opacity-60">
            <!-- Details -->
            <div class="flex flex-col mx-0 my-auto gap-y-5 text-white w-1/2 px-28">
                <div @click="$router.back(1)" class="text-white text-5xl self-start cursor-pointer hover:text-green-500 hover:scale-75 transition duration-200 ease-in">
                    <i class='bx bx-arrow-back' ></i>
                </div>
                <h1 class="flex items-center gap-x-5 text-5xl font-bold">{{movieDetails.title}}<span class="text-sm text-gray-400 uppercase font-semibold tracking-widest">[<span class="italic">{{movieDetails.status}}</span>]</span></h1>
                <h4 class="text-3xl font-semibold line-clamp-1">{{movieDetails.tagline}}</h4>
                <p>{{formatDate(movieDetails.release_date)}}</p>
                <div class="flex flex-wrap gap-5">
                    <span class="px-6 py-1.5 bg-green-500 bg-opacity-70 border-2 border-green-500 rounded-lg" v-for="genre in movieDetails.genres" :key="genre">{{genre.name}}</span>
                </div>
                <p class="mt-5 text-3xl font-thin line-clamp-6">{{movieDetails.overview}}</p>
                <div class="flex items-center gap-x-5 text-2xl">
                    <h3>Vote average:</h3>
                    <i class='bx bxs-star text-green-500'></i>
                    <span>{{twoDecimal}} / 10</span>
                </div>
                <div class="flex items-center gap-x-5 text-2xl">
                    <h3>Vote count:</h3>
                    <i class='bx bxs-upvote ml-5 text-blue-500'></i>
                    <span>{{movieDetails.vote_count}}</span>
                </div>
            </div>

            <!-- Action button -->
            <div class="flex flex-col items-center justify-center gap-y-5 text-white w-1/2 h-full px-28">
                <button type="button" class="flex items-center gap-x-5  py-5 px-10 text-2xl hover:bg-[#2c3e50] hover:border-2 border-[#2c3e50]">
                    <i class='bx bx-heart' ></i>
                    <span>Add to my list</span>
                </button>
            </div>
        </div>
    </div>
    <!-- Actor -->
    <div v-if="movieDetails.casts" class="w-full h-auto px-28 py-10 overflow-hidden">
        <h1 class="text-4xl mb-5">Cast</h1>
        <div ref="toggleHeight" class="w-full flex flex-wrap justify-evenly gap-10 overflow-hidden" :class="[toggleCast ? 'h-auto' : 'h-[12rem]' ]">
            <div :class="{'hidden':!cast.profile_path}" class="flex w-[23rem] h-48 bg-gray-200 rounded-lg shadow-lg" v-for="cast in movieDetails.casts" :key="cast">
                <div class="w-2/4 h-full">
                    <img v-if="cast.profile_path" class="w-full h-full rounded-tl-lg rounded-bl-lg" :src="$store.state.backdropRootUrl+cast.profile_path" :alt="cast.name">
                    <img v-else class="w-full h-full rounded-tl-lg rounded-bl-lg" src="@/assets/no-img.jpg" :alt="cast.name">
                </div>
                <div class="w-full flex flex-col items-center justify-center">
                    <p class="font-semibold text-xl">{{cast.name}}</p>
                    <p class="font-thin italic">as</p>
                    <p class="text-lg">{{cast.character}}</p>
                </div>
            </div>
        </div>
        <div class="w-full h-auto mt-10 text-center rounded-lg bg-green-100 hover:bg-green-400 hover:text-white transition-colors duration-150 ease-in-out">
            <button @click="toggleCast = !toggleCast" type="button" class="w-full py-5 tracking-widest">
                <span v-if="!toggleCast">See more...</span>
                <span v-else>...See less</span>
            </button>
        </div>
    </div>

    <!-- Gallery -->
    <!-- <section class="overflow-hidden">
        <div class="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
            <div class="flex flex-wrap -m-1 md:-m-2">
                <div class="flex flex-wrap w-1/3" v-for="(image, index) in movieDetails.gallery" :key="image" :v-if="index >= 10">
                    <div class="w-full p-1 md:p-2">
                        <img alt="gallery" class="shadow-xl border-2 block object-cover object-center w-full h-full rounded-lg"
                            :src="$store.state.thumbRootURL + image.file_path">
                    </div>
                </div>
            </div>
        </div>
    </section> -->
  </div>
</template>

<script>
import moment from 'moment';

export default {
    data() {
        return {
            movieDetails: [],
            toggleCast: false,
        }
    },
    async mounted() {
        await this.$store.dispatch("getMovieDetails", this.$route.params.id)
        this.movieDetails = this.$store.state.movieDetails;
    },
    methods: {
        formatDate(date) {
           return moment(date).format("MMMM YYYY");
        }
    },
    computed: {
        twoDecimal() { 
            return Math.round(this.movieDetails.vote_average * 100) / 100
        }
    }
}
</script>

<style>

</style>