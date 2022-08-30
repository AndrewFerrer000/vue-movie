<template>
  <div class="w-full h-screen">
    <c-navbar></c-navbar>
    <router-view />
  </div>
</template>

<script>
import CNavbar from "@/components/CNavbar.vue";
export default {
  components: {
    CNavbar,
  },
  async mounted() {
    await this.$store.dispatch("getGenres");
  },
};
</script>

<style lang="postcss">
body {
  @apply overflow-hidden;
}

#app {
  @apply overflow-auto;
}
</style>
