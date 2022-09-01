<template>
  <teleport to="body">
    <div class="pointer-events-none absolute top-0 left-0 w-full h-screen z-0">
      <div
        class="pointer-events-auto absolute bottom-10 right-20 w-96 flex items-center justify-between p-4 border-2 shadow-lg rounded-lg"
        :class="container"
      >
        <i
          class="bx font-bold text-3xl"
          :class="[
            iconColor,
            {
              'bx-info-circle': type === 'info',
              'bx-check': type === 'success',
              'bxs-radiation': type === 'danger',
              'bx-traffic-cone': type === 'warning',
            },
          ]"
        ></i>
        <div class="mx-3 text-sm font-medium" :class="textColor">
          {{ message }}
        </div>
        <button
          type="button"
          class="rounded-lg focus:ring-2 py-0.5 px-2"
          :class="closeBtn"
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
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      typeValue: {
        default: "gray",
        info: "blue",
        success: "green",
        danger: "red",
        warning: "yellow",
      },
    };
  },
  computed: {
    container() {
      return `bg-${this.typeValue[this.type]}-100 border-${
        this.typeValue[this.type]
      }-700`;
    },
    textColor() {
      return `text-${this.typeValue[this.type]}-700`;
    },
    closeBtn() {
      return `bg-${this.typeValue[this.type]}-100 text-${
        this.typeValue[this.type]
      }-500 focus:ring-${this.typeValue[this.type]}-400 hover:bg-${
        this.typeValue[this.type]
      }-200`;
    },
    iconColor() {
      return `text-${this.typeValue[this.type]}-500`;
    },
  },
};
</script>
