<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "LoginView",

  data() {
    return {
      email: "",
      password: "",
      loginFailed: false,
    };
  },

  computed:{
    ...mapGetters("authAndToken", ["isAuth"]),
  },

  methods:{
    ...mapActions("userData", ["getUserData"]),
    ...mapActions("authAndToken", ["login"]),
    ...mapActions("labels", ["getLabels"]),

    async handleLogin() {
      const credentials = {
        email: this.email,
        password: this.password,
      };

      try {
        this.loginFailed = false;
        const response = await this.login(credentials);

        if (response.status === 200) {
          await this.getUserData();
          await this.getLabels();

          this.$router.push({ name : 'collection' });
        }
      }

      catch (error) {
        this.loginFailed = true;
        if (error.response.status === 400) {
          console.error("Login failed with status code: " + error.response.status);
        } else {
          console.error(error);
        }
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
      <div class="col-12 col-sm-12 col-md-9 col-lg-8 col-xl-6 col-xxl-5 m-3">
        <form id="login_form" @submit.prevent="handleLogin">
          <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

          <div v-if="loginFailed" class="form-group text-danger">Login failed. Wrong email or password</div>

          <div class="form-floating mt-2">
            <input v-model="email" type="text" class="form-control" id="floatingInput" placeholder="username" required />
            <label for="floatingInput">Email</label>
          </div>

          <div class="form-floating mt-2">
            <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password" required />
            <label for="floatingPassword">Password</label>
          </div>

          <button class="btn btn-primary w-100 py-2 mt-2" type="submit">Sign in</button>
          <p class="mt-5 mb-3 text-body-secondary text-center">2024 - 2025</p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>