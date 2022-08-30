<template>
  <header>
    <nav
      class="shadow-md p-6 bg-white relative flex items-center w-full justify-between"
    >
      <a href="/" class="flex items-center">
        <i class="bx bx-camera-movie mr-1 text-5xl"></i>
        <h1 class="text-3xl font-bold capitalize">
          <span class="text-green-500">Vue</span> Movie
        </h1>
      </a>
      <div class="px-6 flex flex-wrap items-center justify-between">
        <div
          class="navbar-collapse collapse grow items-center"
          id="navbarSupportedContentY"
        >
          <ul class="navbar-nav mr-auto lg:flex lg:flex-row">
            <li class="nav-item">
              <router-link
                :to="{ name: 'home' }"
                class="nav-link block pr-2 lg:px-2 py-2 hover:text-gray-700 transition duration-150 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                >Home</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'my-list' }"
                class="nav-link block pr-2 lg:px-2 py-2 hover:text-gray-700 transition duration-150 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                >My list</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped>
.router-link-active {
  @apply text-green-500 font-semibold;
}
</style>
