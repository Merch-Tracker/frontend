<script>
import {mapGetters} from "vuex";
import LabelTemplate from "@/components/labels/LabelTemplate.vue";

export default {
  name: "UserLabels",
  components: {LabelTemplate},

  computed: {
    ...mapGetters("labels", ["getUserLabels"])
  },
}
</script>

<template>
  <div class="d-flex justify-content-center">
    <div class="mx-1" v-for="label in getUserLabels" :key="label">
      <router-link :to="{ name: 'edit_label', params: {id: label.LabelUuid} }">
        <LabelTemplate :text="label.name" :color="label.color" :bgcolor="label.bg_color" />
      </router-link>
    </div>
  </div>
</template>

<style scoped>

</style>