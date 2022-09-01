<template>
  <div class="w-full flex items-center justify-center text-2xl mt-10">
    <h1 class="mr-5 text-green-500 font-bold">404:</h1>
    <p>
      The page you are looking doesn't exist.
      <a
        class="ml-5 underline cursor-pointer text-green-500"
        @click="$router.push('/')"
        >Go to homepage.</a
      >
    </p>
  </div>
</template>

