<script>
import {mapGetters} from "vuex";
import PersonalBlock from "@/components/labels/LabelsBlock.vue";
import LabelTemplate from "@/components/labels/LabelTemplate.vue";
import PriceHistoryBlock from "@/components/merch/PriceHistoryBlock.vue";

export default {
  name: "PersonalView",
  components: {PriceHistoryBlock, LabelTemplate, LabelsBlock: PersonalBlock},

  computed:{
    ...mapGetters("userData", ["userName", "userEmail"]),
  },


}
</script>

<template>
  <div class="container">
    <h2 class="text-center">Personal data</h2>
      <div class="card mt-2 p-2">
        <h6> Username: {{ userName }}</h6>
        <h6> Email: {{ userEmail }} </h6>
      </div>
    <LabelsBlock />
  </div>
</template>

<style scoped>

</style>
