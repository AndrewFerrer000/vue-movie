<template>
  <div>
    <c-navbar></c-navbar>
    <router-view/>
  </div>
</template>

<script>
import CNavbar from "@/components/CNavbar.vue"
export default ({
  components: {
    CNavbar,
  }
})
</script>


<style>

</style>
