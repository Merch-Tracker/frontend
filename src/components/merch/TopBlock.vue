<script>
import {mapGetters} from "vuex";
import LabelTemplate from "@/components/labels/LabelTemplate.vue";

export default {
  name: "TopBlock",
  components: {LabelTemplate},

  data(){
    return {
      selectedLabel: null,
    }
  },

  computed: {
    ...mapGetters("merch", ["merchCount"]),
    ...mapGetters("labels", ["getUserLabels"]),
    ...mapGetters("viewFilter", ["getMerchFilters"]),
  },

  methods:{
    setFilter(){
      const labelUuid = this.selectedLabel ? this.selectedLabel.LabelUuid : null;
      this.$store.dispatch("viewFilter/updateMerchFilters", {labelUuid: labelUuid});
    },
  },
}
</script>

<template>
  <div class="container custom-fixed-top mt-1">
    <div class="card">
      <div class="card-body p-2 d-flex justify-content-between align-items-center">
        <span>Number of records: {{ merchCount }}</span>
        <div v-if="!selectedLabel">Current filter: None</div>
        <div v-else>
          Current filter:
          <LabelTemplate :text="selectedLabel.name" :color="selectedLabel.color" :bg_color="selectedLabel.bg_color" />
        </div>

        <div class="d-flex">
          <select class="form-select" v-model="selectedLabel">
            <option :value="null" selected>None</option>
            <option v-for="label in getUserLabels" :key="label" :value="label">
              {{ label.name }}
            </option>
          </select>
          <img src="@/assets/icons/check-square.svg" width="40" height="40" alt="apply"
               @click="setFilter"
               :style="{ cursor: 'pointer' }"
          />
        </div>
        <router-link :to="{ name: 'merchnew' }" class="btn btn-primary">New record</router-link>
      </div>
    </div>
  </div>
</template>

<style>
.custom-fixed-top {
  z-index: 1010;
}
</style>