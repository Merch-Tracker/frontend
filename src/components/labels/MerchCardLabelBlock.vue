<script>
import {mapGetters} from "vuex";
import LabelTemplate from "@/components/labels/LabelTemplate.vue";

export default {
  name: "MerchCardLabelBlock",
  components: {LabelTemplate},

  data(){
    return {
      selectLabelUuid: "",
      cardsLabels: [],
    }
  },

  computed: {
    ...mapGetters("labels", ["getUserLabels"]),

    merchUuid(){
      return this.$route.params.id;
    },
  },

  methods: {
    makeLabels(){
      const labels = this.$store.getters["merch/getMerchByUuid"](this.merchUuid).labels || [];
      if (labels.length > 0){
        const userLabels = this.getUserLabels;
        this.cardsLabels = userLabels.filter(label => labels.includes(label.LabelUuid));
      }
    },

    async attachLabel(){
      await this.$store.dispatch("labels/attachLabel", {merch_uuid: this.merchUuid, label_uuid: this.selectLabelUuid});
      this.makeLabels();
    },

    async detachLabel(lid){
      await this.$store.dispatch("labels/detachLabel", {merch_uuid: this.merchUuid, label_uuid:lid});
      this.makeLabels();
    },
  },

  mounted() {
    this.makeLabels();
  },
}
</script>

<template>
  <div class="card mt-3 d-flex flex-md-row shadow-sm justify-content-around p-2">
    <div>Labels:</div>

    <div v-if="cardsLabels.length === 0">
      No labels
    </div>

    <div v-else v-for="label in cardsLabels" :key="label">
      <LabelTemplate :text="label.name" :color="label.color" :bgcolor="label.bg_color" />
      <img src="@/assets/icons/close-square.svg" width="40" height="40"  alt="detach"
           @click="detachLabel(label.LabelUuid)"
           :style="{ cursor: 'pointer' }"
      />
    </div>

    <div class="d-flex">
      <div class="p-2">Select:</div>
      <select class="form-select" v-model="selectLabelUuid">
        <option v-for="label in getUserLabels" :key="label" :value="label.LabelUuid">
          {{ label.name }}
        </option>
      </select>
      <img src="@/assets/icons/add-square.svg" width="40" height="40" alt="attach"
           @click="attachLabel"
           :class="{ 'disabled': !selectLabelUuid }"
           :style="{ cursor: selectLabelUuid ? 'pointer' : 'not-allowed' }"
      />
    </div>
  </div>
</template>

<style scoped>

</style>