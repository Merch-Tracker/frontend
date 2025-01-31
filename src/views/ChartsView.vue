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
      lastUpdate: null,
      nextUpdate: null,
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
      this.lastUpdated() // temporary
    },

    lastUpdated(){
      if (this.chartsData != null) {
        const lastElem = this.chartsData[0].prices
        const last = new Date(this.chartsData[0].prices[lastElem.length - 1].created_at);
        this.lastUpdate = this.formatTime(last);

        const next = new Date(last);
        next.setHours(next.getHours() + 6);
        this.nextUpdate = this.formatTime(next);
      }
    },

    formatTime(date){
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      const day = date.getDate();
      const month = date.toLocaleString('en-US', { month: 'long' });
      const year = date.getFullYear();

      return `${hours}:${minutes}:${seconds} ${day} ${month} ${year}`;
    },


  },

  mounted() {
    this.chartsData = this.getChartsData();
  },
}
</script>

<template>
  <div class="container">
    <div class="card mt-2 mb-2">
      <div class="row p-2">
        <div class="col-6 d-flex text-center justify-content-center align-items-center">Last updated: {{ lastUpdate }} UTC</div>
        <div class="col-6 d-flex text-center justify-content-center align-items-center">Next update: {{ nextUpdate }} UTC</div>
      </div>
    </div>

    <PeriodSelector class="mt-2" @update:count="selectorUpdate" />
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 justify-content-evenly align-items-stretch mt-2">
      <div v-for="item in chartsData" :key="item" class="mt-2">
        <router-link :to="{ name: 'merchdetail', params: { id: item.MerchUuid } }" class="custom-no-underline">
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