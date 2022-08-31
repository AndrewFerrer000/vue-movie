<template>
  <header>
    <nav
      class="shadow-md p-6 bg-white relative flex items-center w-full justify-between"
    >
      <a href="/" class="flex items-center">
        <i class="bx bx-camera-movie mr-1 text-2xl md:text-5xl"></i>
        <h1 class="text-lg md:text-3xl font-bold capitalize">
          <span class="text-green-500">Vue</span> Movie
        </h1>
      </a>
      <div class="px-6 flex flex-wrap items-center justify-between">
        <div
          class="navbar-collapse collapse grow items-center"
          id="navbarSupportedContentY"
        >
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
            <li class="nav-item" v-if="!this.$store.state.user.data">
              <router-link
                :to="{ name: 'sign-in' }"
                class="block pr-2 lg:px-4 py-2 bg-green-500 text-white hover:bg-green-800 rounded-lg transition duration-150 ease-in-out"
                >Sign in</router-link
              >
            </li>
            <li class="nav-item" v-else>
              <button
                @click="logoutUser"
                class="block pr-2 lg:px-4 py-2 text-red-500 hover:text-red-800 rounded-lg transition duration-150 ease-in-out"
              >
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    logoutUser() {
      localStorage.removeItem("userdata");
      this.$router.push({ name: "sign-in" });
    },
  },
};
</script>

<style lang="postcss" scoped>
.nav-link.router-link-active {
  @apply text-green-500 font-semibold;
}
</style>
