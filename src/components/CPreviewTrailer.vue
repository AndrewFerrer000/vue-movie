<template>
  <div
    @click="$emit('closeTrailer')"
    class="absolute top-0 left-0 flex items-center justify-center w-full h-screen bg-[#34495e] bg-opacity-70 filter backdrop-blur-sm z-50"
  >
    <div class="h-3/6 sm:w-4/5 xl:w-2/3 xl:h-4/5">
      <iframe
        class="w-full h-full"
        :src="`https://www.youtube.com/embed/${trailerDetails.key}?autoplay=1&mute=1&subtitle=1&enablejsapi=1`"
        :name="trailerDetails.name"
        scrolling="No"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  props: ["trailerDetails"],
};
</script>
