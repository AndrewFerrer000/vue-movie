<template>
  <div class="w-full h-screen">
    <CNavbar />
    <router-view />
  </div>
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/main";
import CNavbar from "@/components/CNavbar.vue";
export default {
  components: {
    CNavbar,
  },
  async mounted() {
    await this.$store.dispatch("getGenres");

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$store.commit("SET_USER", user);
      } else this.$store.commit("CLEAR_USER");
    });
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
