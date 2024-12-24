<script>
export default {
  name: "DetailedView",

  computed: {
    details(){
      const merchUuid = this.$route.params.id;
      return this.$store.getters["merch/getMerchByUuid"](merchUuid);
    }
  },
}
</script>

<template>
  <h1 class="text-center mt-3">Detailed information</h1>
  <div class="card mt-3 d-flex flex-column flex-md-row shadow-sm">
    <div class="card-body d-flex flex-column flex-md-row">
      <img src="https://placehold.co/400x225" class="card-img-top img-fluid w-auto mb-3 mb-md-0" alt="Placeholder">
      <div class="ms-md-3">
        <h6 class="custom-small-text">ID: {{ details.MerchUuid }}</h6>
        <p class="card-text">Name: {{ details.name }}</p>
        <p class="card-text">Link: {{ details.link }}</p>
        <p class="card-text">Added: {{ details.CreatedAt }}</p>
        <p class="card-text">Updated: {{ details.UpdatedAt }}</p>
      </div>
    </div>
  </div>
  <div class="card mt-3 d-flex flex-md-row shadow-sm justify-content-around p-3">
      <div>Old price: <strong style="color: green">10 000</strong></div>
      <div>New price: <strong style="color: red">20 000</strong></div>
      <div>Difference: <strong style="color: red">↑100%</strong></div>
  </div>
  <div class="card mt-3 shadow-sm p-3">
    <p class="card-text text-center">Placeholder for some other information</p>
  </div>
  <div class="mt-5 d-flex justify-content-center">
    <button class="btn w-75 btn-danger btn-lg">Delete</button>
  </div>
</template>

<style>
</style>