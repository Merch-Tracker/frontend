<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Navbar",

  computed:{
    ...mapGetters(["isAuth"]),
  },

  methods:{
    ...mapActions(["logout"]),

    async handleLogout() {
      try {
        await this.logout();
        this.$router.push("/");
      }
      catch (error) {
        console.error(error);
      }
    },
  },
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <router-link to="/" class="navbar-brand">Merch parser</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse">
        <div class="me-auto" v-if="isAuth">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link active">Collection</router-link>
            </li>
          </ul>
        </div>

        <div class="ms-auto" v-if="!isAuth">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li>
              <router-link to="/register" class="nav-link active">Register</router-link>
            </li>
            <li class="nav-item">
              <span class="nav-link active">|</span>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link active">Login</router-link>
            </li>
          </ul>
        </div>

        <div class="ms-auto" v-if="isAuth">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/personal" class="nav-link active">Personal</router-link>
            </li>
            <li class="nav-item">
              <span class="nav-link active">|</span>
            </li>
            <li class="nav-item">
              <span class="nav-link disabled">Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>