<template>
  <header>
    <nav
      class="shadow-md p-6 relative flex items-center w-full justify-between"
    >
      <a href="/" class="flex items-center">
        <i class="bx bx-camera-movie mr-1 text-2xl md:text-5xl" />
        <h1 class="text-lg md:text-3xl font-bold capitalize">
          <span class="text-green-500">Vue</span> Movie
        </h1>
      </a>
      <div class="px-6 flex flex-wrap items-center justify-between">
        <div class="navbar-collapse collapse grow items-center">
          <ul class="navbar-nav mr-auto flex">
            <li class="nav-item">
              <router-link
                :to="{ name: 'home' }"
                class="nav-link block pr-2 lg:px-2 py-2 transition duration-150 ease-in-out"
                >Home</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'my-list' }"
                class="nav-link block pr-2 lg:px-2 py-2 transition duration-150 ease-in-out"
                >My list</router-link
              >
            </li>
            <li class="nav-item" v-if="$store.state.isAuthenticated">
              <button
                @click="logoutUser"
                class="block pr-2 lg:px-4 py-2 text-red-500 hover:text-red-800 rounded-lg transition duration-150 ease-in-out"
              >
                Log out
              </button>
            </li>
            <li class="nav-item" v-else>
              <router-link
                :to="{ name: 'sign-in' }"
                class="block ml-4 p-2 lg:px-4 py-2 bg-green-500 text-white hover:bg-green-800 rounded-lg transition duration-150 ease-in-out"
                >Sign in</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { signOut } from "firebase/auth";
import { auth } from "@/main";

export default {
  data() {
    return {
      isAuth: false,
    };
  },
  watch: {
    "$store.state.isAuthenticated": function (newData) {
      this.isAuth = newData;
    },
  },
  methods: {
    logoutUser() {
      signOut(auth).then(() => {
        this.$store.commit("CLEAR_USER");

        this.$router.push({ name: "sign-in" });
      });
    },
  },
};
</script>

<style lang="postcss" scoped>
.nav-link.router-link-active {
  @apply text-green-500 font-semibold;
}
</style>
