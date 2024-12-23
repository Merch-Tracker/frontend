<script>
import {mapGetters} from "vuex";

export default {
  name: "TopBlock",

  computed: {
    ...mapGetters("merch", ["merchCount"]),
  },
}
</script>

<template>
  <div class="container custom-fixed-top mt-1">
    <div class="card">
      <div class="card-body p-2 d-flex justify-content-between align-items-center">
        <span>Всего записей: {{ merchCount }}</span>
        <router-link to="/newmerch" class="btn btn-primary">Новая запись</router-link>
      </div>
    </div>
  </div>
</template>

<style>
.custom-fixed-top {
  z-index: 1010;
}
</style>