<script>
import {CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from 'chart.js'

import {Line} from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend, LineElement, PointElement)

export default {
  name: "ChartBlock",

  components: {
    Line
  },

  props: {
    priceData: {
      type: Object,
      required: true,
    }
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

  methods: {
    setPrices(){
      this.data.labels = this.priceData.map(item => {
        const date = new Date(item.created_at);
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'short' });
        return `${day} ${month}`;
      });
      this.data.datasets[0].data = this.priceData.map(item => item.price);
      this.drawChart = true;
    },
  },
  mounted() {
    this.setPrices()
  },
}
</script>

<template>
  <div v-if="drawChart">
    <Line :data="data" :options="options" class="w-100 h-auto" />
  </div>
</template>

<style scoped>

</style>