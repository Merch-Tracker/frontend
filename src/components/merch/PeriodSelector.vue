<script>
import {mapGetters} from "vuex";

export default {
  name: "PeriodSelector",

  computed: {
    ...mapGetters("charts", ["getChartDays"]),
    count() {
      return this.getChartDays;
    }
  },

  methods: {
    async setDays(value){
      this.$store.dispatch("charts/changeChartDays", value);
      this.$emit("update:count", value);
    },
  },

}
</script>

<template>
  <div class="row justify-content-evenly">
    <div class="col-4">
      <button class="btn w-100"
              :class="{'btn-primary': count !== 7, 'btn-success': count === 7}"
              @click="setDays(7)">
        7 days
      </button>
    </div>

    <div class="col-4">
      <button class="btn w-100"
              :class="{'btn-primary': count !== 14, 'btn-success': count === 14}"
              @click="setDays(14)">
        2 weeks
      </button>
    </div>

    <div class="col-4">
      <button class="btn w-100"
              :class="{'btn-primary': count !== 30, 'btn-success': count === 30}"
              @click="setDays(30)">
        1 month
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>



<!--<div class="row justify-content-evenly">-->
<!--<div class="col-4">-->
<!--  <button class="btn w-100"-->
<!--          :class="{'btn-primary': count !== 7, 'btn-success': count === 7}"-->
<!--          @click="setDays(7)">-->
<!--    7 days-->
<!--  </button>-->
<!--</div>-->

<!--<div class="col-4">-->
<!--  <button class="btn w-100"-->
<!--          :class="{'btn-primary': count !== 14, 'btn-success': count === 14}"-->
<!--          @click="setDays(14)">-->
<!--    2 weeks-->
<!--  </button>-->
<!--</div>-->

<!--<div class="col-4">-->
<!--  <button class="btn w-100"-->
<!--          :class="{'btn-primary': count !== 30, 'btn-success': count === 30}"-->
<!--          @click="setDays(30)">-->
<!--    1 month-->
<!--  </button>-->
<!--</div>-->
<!--</div>-->