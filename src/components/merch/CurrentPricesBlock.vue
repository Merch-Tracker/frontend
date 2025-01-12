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
    <div>Old price: <strong style="color: darkorange">{{ details.old_price }}</strong></div>
    <div>Current price: <strong style="color: darkcyan">{{ details.new_price }}</strong></div>
    <div>Difference: <strong style="color: red">{{ details.new_price - details.old_price }}</strong></div>
  </div>
</template>

<style scoped>

</style>