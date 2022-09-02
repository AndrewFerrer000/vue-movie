<template>
  <div
    class="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-20 lg:py-0"
  >
    <div
      class="w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-green-500 md:text-2xl"
        >
          Sign in to your account
        </h1>
        <form class="space-y-4 md:space-y-6" @submit.prevent="signInUser">
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Your email</label
            >
            <input
              type="email"
              name="email"
              id="email"
              v-model="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="name@email.com"
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Password</label
            >
            <input
              type="password"
              name="password"
              id="password"
              v-model="password"
              placeholder="Password"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
            />
          </div>
          <p v-if="errorMsg" class="text-red-500 text-center">{{ errorMsg }}</p>
          <button
            type="submit"
            class="w-full text-white bg-green-500 hover:bg-green-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-200 ease-in-out"
          >
            Sign in
          </button>
          <p class="text-sm font-light text-gray-500">
            Don’t have an account yet?
            <router-link
              :to="{ name: 'sign-up' }"
              class="font-medium text-primary-600 hover:underline"
              >Sign up</router-link
            >
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      errorMsg: null,
    };
  },
  methods: {
    async signInUser() {
      try {
        await this.$store.dispatch("signinUser", {
          email: this.email,
          password: this.password,
        });
      } catch (error) {
        this.errorMsg = error.message;
        this.password = "";
      }
    },
  },
};
</script>

<style></style>
