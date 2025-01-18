<script>
import ChartBlock from "@/components/merch/ChartBlock.vue";

export default {
  name: "ChartCard" ,
  components: {ChartBlock},

  props:{
    cardData: {
      type: Object,
      required: true,
    },
  },
}
</script>

<template>
  <div class="card shadow">
    <div class="card-body d-flex flex-column">
      <p class="text-center"><strong>{{ cardData.name }}</strong></p>
      <ChartBlock :priceData="cardData.prices"/>
      <a :href="cardData.link" class="text-center" target="_blank" @click.stop>{{ cardData.link }}</a>
    </div>
    <div>
      <h6 class="custom-small-text text-center">{{ cardData.MerchUuid }}</h6>
    </div>
  </div>
</template>

<style scoped>

</style>