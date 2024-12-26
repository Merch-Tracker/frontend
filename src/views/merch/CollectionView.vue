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
        <router-link :to="{ name: 'merchdetail', params: { id: item.MerchUuid } }" class="custom-no-underline">
          <MerchCard
              :name="item.name"
              :link="item.link"
              :uuid="item.MerchUuid"
              :new_price="item.new_price"
              :old_price="item.old_price"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-no-underline{
  text-decoration: none;
  color: inherit;
}
</style>
