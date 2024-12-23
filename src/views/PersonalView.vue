<script>
import {mapGetters} from "vuex";
import axios from "axios";

export default {
  name: "PersonalView",

  computed:{
    ...mapGetters("userData", ["userName", "userEmail"]),
  },


}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <h3>Personal data</h3>
      <ul>
        <li>Username: {{ userName }}</li>
        <li>Email: {{ userEmail }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>
