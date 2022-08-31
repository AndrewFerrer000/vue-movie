<template>
  <teleport to="body">
    <div class="pointer-events-none absolute top-0 left-0 w-full h-screen z-0">
      <div
        class="pointer-events-auto absolute bottom-10 right-20 w-96 flex items-center justify-between p-4 border-2 shadow-lg rounded-lg"
        :class="[
          {
            'bg-gray-100 border-gray-700': type == 'default',
            'bg-blue-100 border-blue-700': type == 'info',
            'bg-green-100 border-green-700': type == 'success',
            'bg-red-100 border-red-700': type == 'danger',
            'bg-yellow-100 border-yellow-700': type == 'warning',
          },
        ]"
      >
        <i
          class="bx font-bold text-3xl"
          :class="[
            {
              'text-gray-500': type == 'default',
              'text-blue-500 bx-info-circle': type == 'info',
              'text-green-500 bx-check': type == 'success',
              'text-red-500 bxs-radiation': type == 'danger',
              'text-yellow-500 bx-traffic-cone': type == 'warning',
            },
          ]"
        ></i>
        <div
          class="mx-3 text-sm font-medium"
          :class="[
            {
              'text-gray-700': type == 'default',
              'text-blue-700': type == 'info',
              'text-green-700': type == 'success',
              'text-red-700': type == 'danger',
              'text-yellow-700': type == 'warning',
            },
          ]"
        >
          {{ message }}
        </div>
        <button
          type="button"
          class="rounded-lg focus:ring-2 py-0.5 px-2"
          :class="[
            {
              'bg-gray-100 text-gray-500 focus:ring-gray-400 hover:bg-gray-200':
                type == 'default',
              'bg-blue-100 text-blue-500 focus:ring-blue-400 hover:bg-blue-200':
                type == 'info',
              'bg-green-100 text-green-500 focus:ring-green-400 hover:bg-green-200':
                type == 'success',
              'bg-red-100 text-red-500 focus:ring-red-400 hover:bg-red-200':
                type == 'danger',
              'bg-yellow-100 text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200':
                type == 'warning',
            },
          ]"
        >
          <i class="bx bx-x text-2xl grid place-items-center"></i>
        </button>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "default",
      required: true,
    },
    message: {
      type: String,
      default: "A simple info alert",
      required: true,
    },
  },
};
</script>

<style></style>
