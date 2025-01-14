<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Navbar",

  computed:{
    ...mapGetters("authAndToken", ["isAuth"]),
  },

  methods:{
    ...mapActions("authAndToken", ["logout"]),

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
      <router-link to="/" class="navbar-brand">Merch tracker</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbar">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="isAuth">
          <li class="nav-item">
            <router-link :to="{ name : 'collection' }" class="nav-link active">Collection</router-link>
          </li>
        </ul>

        <ul class="navbar-nav ms-auto mb-2 mb-lg-0"  v-if="!isAuth">
          <li>
            <router-link :to="{ name : 'register' }" class="nav-link active">Register</router-link>
          </li>
          <li class="nav-item d-none d-lg-inline">
            <span class="nav-link active">|</span>
          </li>
          <li class="nav-item">
            <router-link :to="{ name : 'login' }" class="nav-link active">Login</router-link>
          </li>
        </ul>

        <ul class="navbar-nav ms-auto mb-2 mb-lg-0" v-if="isAuth">
          <li class="nav-item">
            <router-link :to="{ name : 'personal' }" class="nav-link active">Personal</router-link>
          </li>
          <li class="nav-item d-none d-lg-inline">
            <span class="nav-link active">|</span>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="#" @click.prevent="handleLogout">Logout</a>
          </li>
        </ul>
        </div>
      </div>
  </nav>
</template>

<style>

</style>