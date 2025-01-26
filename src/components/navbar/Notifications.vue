<script>
import {mapGetters} from "vuex";

export default {
  name: "Notifications",

  computed: {
    ...mapGetters("notifications", ["getNumber"])
  },
}
</script>

<template>
    Notifications <span v-if="getNumber !== 0">[ {{ getNumber }} ]</span>
</template>

<style scoped>

</style>