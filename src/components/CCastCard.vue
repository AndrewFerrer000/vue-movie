<template>
  <div
    :class="{ hidden: !castDetails.profile_path }"
    class="flex w-23 lg:w-[23rem] h-48 bg-gray-200 rounded-lg shadow-lg overflow-hidden"
  >
    <div class="w-full lg:w-2/4 h-full">
      <img
        v-if="castDetails.profile_path"
        class="w-full h-full rounded-tl-lg rounded-bl-lg"
        :src="backdropRootURL + castDetails.profile_path"
        :alt="castDetails.name"
      />
    </div>
    <div
      class="hidden w-full lg:flex flex-col items-center justify-center px-2"
    >
      <p class="font-semibold text-xl">{{ castDetails.name }}</p>
      <p class="font-thin italic">as</p>
      <p class="text-lg text-center">{{ castDetails.character }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["castDetails"],
  computed: {
    backdropRootURL() {
      return this.$store.state.rootURL.backdrop;
    },
  },
};
</script>
