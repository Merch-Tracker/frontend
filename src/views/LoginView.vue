<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "LoginView",

  data() {
    return {
      email: "",
      password: "",
    };
  },

  computed:{
    ...mapGetters("authAndToken", ["isAuth"]),
  },

  methods:{
    ...mapActions("userData", ["getUserData"]),
    ...mapActions("authAndToken", ["login"]),

    async handleLogin() {
      const credentials = {
        email: this.email,
        password: this.password,
      };

      try {
        await this.login(credentials);
        await this.getUserData();
        this.$router.push("/collection");
      }
      catch (error) {
        console.error(error);
      }
    },
  },

  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("isAuth")) {
      next({ path : "/" });
    } else {
      next();
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-4 m-3">
        <form id="login_form" @submit.prevent="handleLogin">
          <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

          <div class="form-floating mt-2">
            <input v-model="email" type="text" class="form-control" id="floatingInput" placeholder="username" required />
            <label for="floatingInput">Email</label>
          </div>

          <div class="form-floating mt-2">
            <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password" required />
            <label for="floatingPassword">Password</label>
          </div>

          <button class="btn btn-primary w-100 py-2 mt-2" type="submit">Sign in</button>
          <p class="mt-5 mb-3 text-body-secondary">2024</p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>