<script>
import {mapGetters} from "vuex";
import axios from "axios";

export default {
  name: "PersonalView",

  data() {
    return {
      userinfo: {
        username: "",
        email: "",
      },
    }
  },

  methods: {
    async getUserinfo(){
      try {
        const token = await this.$store.dispatch("getToken");
        const response = await axios.get(`/user`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        this.userinfo = response.data;
      }
      catch(error){
        console.log(error)
      }
    },
  },

  computed:{
    ...mapGetters(["isAuth"]),
  },

  beforeMount() {
    this.getUserinfo();
  },

}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <h3>Personal data</h3>
      <ul>
        <li>Username: {{ userinfo.username }}</li>
        <li>Email: {{ userinfo.email }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>