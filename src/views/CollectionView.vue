<script>
import MerchCard from "@/components/merch/Card.vue";
import MerchRow from "@/components/merch/Row.vue";
import TopBlock from "@/components/merch/TopBlock.vue";
import {mapGetters} from "vuex";


export default {
  components: {TopBlock, MerchRow, MerchCard},
  computed: {
    ...mapGetters("userData", ["userName"]),
  }
}
</script>

<template>
  <div class="container">
    <TopBlock />
  </div>
  <div class="container" style="padding-top: 60px;">
  <h1 class="text-center">Your collection, master {{ userName }}</h1>
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

</template>

<style scoped>

</style>