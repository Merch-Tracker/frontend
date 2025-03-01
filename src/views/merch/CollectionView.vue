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
    ...mapGetters("merch", ["readAllMerch", "getFilteredMerch"]),
    ...mapGetters("viewFilter", ["getMerchFilters"]),

    merchList(){
      return this.getMerchFilters ? this.getFilteredMerch : this.readAllMerch;
    },
  },

  methods: {
    async getAllMerch(){
      await this.$store.dispatch("merch/readAllMerch");
    },
  },

  // mounted() {
  //   this.getAllMerch();
  // }
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getAllMerch();
    });
  }
}
</script>

<template>
  <div class="container">
    <TopBlock />
  </div>
  <div class="container mt-1">
  <h1 class="text-center">Your collection, master {{ userName }}</h1>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 justify-content-start align-items-stretch">
      <div v-for="item in merchList" :key="item" class="mt-2">
        <MerchCard :attrs="item" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
