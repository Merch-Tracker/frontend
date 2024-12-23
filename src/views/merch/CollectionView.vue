<script>
import MerchCard from "@/components/merch/Card.vue";
import MerchRow from "@/components/merch/Row.vue";
import TopBlock from "@/components/merch/TopBlock.vue";
import {mapGetters} from "vuex";


export default {
  name: "CollectionView",

  components: {TopBlock, MerchRow, MerchCard},

  computed: {
    ...mapGetters("userData", ["userName"]),
    ...mapGetters("merch", ["readAllMerch"]),
  },

  methods: {
    async getAllMerch(){
      await this.$store.dispatch("merch/readAllMerch");
    }
  },

  mounted() {
    this.getAllMerch();
  }

}
</script>

<template>
  <div class="container">
    <TopBlock />
  </div>
  <div class="container mt-1">
  <h1 class="text-center">Your collection, master {{ userName }}</h1>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      <div v-for="item in readAllMerch" :key="item">
        <MerchCard :name="item.name" :link="item.link" />
      </div>
    </div>
  </div>

  <div class="container mt-3">
    <div class="row">
      <div v-for="item in readAllMerch" :key="item">
        <MerchRow :name="item.name" :link="item.link" />
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
