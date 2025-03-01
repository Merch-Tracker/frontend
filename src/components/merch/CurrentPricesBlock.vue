<script>
export default {
  name: "CurrentPricesBlock",

  props: {
    details: {
      type: Object,
      required: true,
    }
  }
}
</script>

<template>
  <div class="card mt-3 d-flex flex-md-row shadow-sm justify-content-around p-3">
    <div>Old price: <strong style="color: darkorange">{{ details[1] }}</strong></div>
    <div>Current price: <strong style="color: darkcyan">{{ details[0] }}</strong></div>
    <div>Difference: <strong style="color: red">{{ details[0] - details[1] }}</strong></div>
  </div>
</template>

<style scoped>

</style>