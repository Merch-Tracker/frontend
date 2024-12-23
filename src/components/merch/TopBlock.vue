<script>
export default {
  name: "TopBlock",
}
</script>

<template>
  <div class="container fixed-top mt-1" style="padding-top: 60px;">
    <div class="card">
      <div class="card-body p-2 d-flex justify-content-between align-items-center">
        <span>Всего записей: 10</span>
        <router-link to="/newmerch" class="btn btn-primary">Новая запись</router-link>
      </div>
    </div>
  </div>
</template>

<style>
.fixed-top {
  z-index: 1010;
}
</style>