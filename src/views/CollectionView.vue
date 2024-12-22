<script>
import MerchCard from "@/components/merch/Card.vue";
import MerchRow from "@/components/merch/Row.vue";

export default {
  components: {MerchRow, MerchCard},
  computed: {
    username() {
      return this.$store.getters.userName
    }
  }
}
</script>

<template>
<h1 class="text-center">Your collection, master {{ username }}</h1>
  <div class="container">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      <MerchCard />
      <MerchCard />
      <MerchCard />
      <MerchCard />
      <MerchCard />
      <MerchCard />
      <MerchCard />
      <MerchCard />
      <MerchCard />
    </div>
  </div>

  <div class="container mt-5">
    <div class="row">
      <div class="col">
        <MerchRow />
        <MerchRow />
        <MerchRow />
        <MerchRow />
        <MerchRow />
      </div>
    </div>
  </div>


  <div class="container mt-5"></div>
</template>

<style scoped>

</style>