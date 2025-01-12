<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
} from 'chart.js'

import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend, LineElement, PointElement)

export default {
  name: "PriceHistoryBlock",

  components: {
    Line
  },

  data(){
    return {
      drawChart: false,
      count: 7,
      //chart
      data: {
        labels: [],
        datasets: [
            {
              label: "Price",
              data: [],
              borderColor: "#ff6384",
            }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {position: 'top'},
          title: {display: true, text:"Price history"},
        },
      }
    }
  },

  props: {
    merchUuid: {
      type: String,
      required: true,
    }
  },

  methods: {
    async getPrices(){
      const data = await this.$store.dispatch("pricesHistory/getPricesHistory", {merchUuid: this.merchUuid, count: this.count});

      this.data.labels = data.map(item => {
        const date = new Date(item.date);
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'short' });
        return `${day} ${month}`;
      });

      this.data.datasets[0].data = data.map(item => item.price);
      this.drawChart = true;
    },

    async get7(){
      this.drawChart = false;
      this.count = 7;
      await this.getPrices();
    },

    async get14(){
      this.drawChart = false;
      this.count = 14;
      await this.getPrices();
    },

    async get30(){
      this.drawChart = false;
      this.count = 30;
      await this.getPrices();
    },
  },

  mounted(){
    this.getPrices();
  },


}
</script>

<template>
  <div class="card mt-3 d-flex shadow-sm p-3 align-items-center mt-3" style="height: 700px">
    <div class="row w-100 g-3">
      <div class="col-4"><button class="btn btn-primary w-100" @click="get7">7 days</button></div>
      <div class="col-4"><button class="btn btn-primary w-100" @click="get14">2 weeks</button></div>
      <div class="col-4"><button class="btn btn-primary w-100" @click="get30">1 month</button></div>
    </div>

    <div class="w-100 h-auto">
      <div v-if="drawChart" class="w-100 h-auto">
        <Line :data="data" :options="options" class="w-100 h-auto"/>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>