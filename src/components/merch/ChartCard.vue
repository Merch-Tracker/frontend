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

  computed: {
    details() {
      const detail = this.$store.getters["merch/getMerchByUuid"](this.cardData.merch_uuid);
      return detail ? detail : { data: { link: '#' }, merch: { origin: 'unknown' } };
    },
  },
}
</script>

<template>
  <div class="card shadow">
    <div class="card-body d-flex flex-column">
      <p class="text-center"><strong>{{ cardData.name }}</strong></p>
      <ChartBlock :priceData="cardData.prices"/>
      <a :href="details.data.link" class="text-center" target="_blank" @click.stop>Link to {{ details.merch.origin }}</a>
    </div>
    <div>
      <h6 class="custom-small-text text-center">{{ cardData.merch_uuid }}</h6>
    </div>
  </div>
</template>

<style scoped>

</style>