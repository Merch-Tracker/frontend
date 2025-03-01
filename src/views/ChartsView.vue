<script>
import {mapGetters} from "vuex";
import axios from "axios";
import MerchCard from "@/components/merch/Card.vue";
import ChartCard from "@/components/merch/ChartCard.vue";
import PeriodSelector from "@/components/merch/PeriodSelector.vue";

export default {
  name: "ChartsView",
  components: {PeriodSelector, ChartCard, MerchCard},

  computed: {
    ...mapGetters("authAndToken", ["token"]),
    ...mapGetters("charts", ["getChartDays"]),
      daysCount() {
        return this.getChartDays
      }
  },

  data() {
    return {
      chartsData: null,
    }
  },

  methods: {
    selectorUpdate(value){
      this.daysCount = value;
      this.getChartsData()
    },

    async getChartsData(){
      try {
        const response = await axios.get(`charts`, {
          headers: {Authorization: `Bearer ${this.token}`},
          params: { count: this.daysCount }
        })
        this.chartsData = response.data;
      }

      catch (error) {
        console.log(error)
      }
    },
  },

  mounted() {
    this.chartsData = this.getChartsData();
  },
}
</script>

<template>
  <div class="container">
    <PeriodSelector class="mt-2" @update:count="selectorUpdate" />
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 justify-content-evenly align-items-stretch mt-2">
      <div v-for="item in chartsData" :key="item" class="mt-2">
        <router-link :to="{ name: 'merchdetail', params: { id: item.merch_uuid } }" class="custom-no-underline">
          <ChartCard :card-data="item"/>
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

.card:hover {
  border-color: #007bff;
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
}
</style>