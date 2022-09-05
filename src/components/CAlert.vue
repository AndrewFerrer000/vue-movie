<template>
  <teleport to="body">
    <div class="pointer-events-none absolute top-0 left-0 w-full h-screen z-0">
      <div
        :class="containerClass"
        class="pointer-events-auto absolute bottom-10 right-20 w-96 flex items-center justify-between p-4 border-2 shadow-lg rounded-lg"
      >
        <i
          class="bx font-bold text-3xl"
          :class="[
            iconColorClass,
            {
              'bx-info-circle': alertType === 'info',
              'bx-check': alertType === 'success',
              'bxs-radiation': alertType === 'danger',
              'bx-traffic-cone': alertType === 'warning',
            },
          ]"
        />
        <div class="mx-3 text-sm font-medium" :class="textColorClass">
          {{ message }}
        </div>
        <button
          type="button"
          class="rounded-lg focus:ring-2 py-0.5 px-2"
          :class="closeBtnClass"
        >
          <i class="bx bx-x text-2xl grid place-items-center" />
        </button>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  props: {
    alertType: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 1000,
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
  mounted() {
    console.log(this.duration);
  },
  computed: {
    containerClass() {
      return [
        `bg-${this.typeValue[this.alertType]}-100`,
        `border-${this.typeValue[this.alertType]}-700`,
      ];
    },
    textColorClass() {
      return [`text-${this.typeValue[this.alertType]}-700`];
    },
    closeBtnClass() {
      return [
        `bg-${this.typeValue[this.alertType]}-100`,
        `text-${this.typeValue[this.alertType]}-500`,
        `focus:ring-${this.typeValue[this.alertType]}-400`,
        `hover:bg-${this.typeValue[this.alertType]}-200`,
      ];
    },
    iconColorClass() {
      return `text-${this.typeValue[this.alertType]}-500`;
    },
  },
};
</script>
