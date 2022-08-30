<template>
  <div
    class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0"
  >
    <h1 class="flex items-center mb-6 text-2xl">
      <span class="text-green-500 font-semibold mr-2">Vue</span
      ><span>Movie</span>
    </h1>
    <div
      class="w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-green-500 md:text-2xl"
        >
          Sign in to your account
        </h1>
        <form class="space-y-4 md:space-y-6" action="#">
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
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="name@email.com"
              required=""
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
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              required=""
            />
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50"
                  required=""
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="remember" class="text-gray-500">Remember me</label>
              </div>
            </div>
            <a
              href="#"
              class="text-sm font-medium text-primary-600 hover:underline"
              >Forgot password?</a
            >
          </div>
          <button
            type="submit"
            class="w-full text-white bg-green-500 hover:bg-green-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-200 ease-in-out"
          >
            Sign in
          </button>
          <p class="text-sm font-light text-gray-500">
            Don’t have an account yet?
            <a href="#" class="font-medium text-primary-600 hover:underline"
              >Sign up</a
            >
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
