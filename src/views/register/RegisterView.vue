<script>
import axios from "axios";
import router from "@/router/index.js";

export default {
  name: "RegisterView",

  data(){
    return {
      username: "",
      email: "",
      password: "",
      error: false,
    }
  },

  methods:{
    async register(){
      try {
        const credentials = {"username": this.username, "email": this.email, "password": this.password};
        const response = await axios.post("/register", credentials);

        if (response.status === 201){
          await router.push({name: "register_success"});
        }
      }
      catch (error) {
        if (error.response){
          this.error = true;
        }
        console.log(error);
      }
    },
  },
}
</script>

<template>
  <div class="container">
    <h1 class="text-center">Register new account</h1>

    <div class="row" v-if="error===true">
      <h4 class="text-center text-danger">Error occured, please try again</h4>
    </div>

    <form @submit.prevent="register">
      <div class="form-group">

        <label for="username" class="mt-3">Username</label>
        <input id="username"
               type="text"
               placeholder="Username"
               class="form-control"
               v-model="username"
        />

        <label for="email" class="mt-3">Email address</label>
        <input id="email"
               type="email"
               placeholder="Email address"
               required
               class="form-control"
               v-model="email"
        />

        <label for="password" class="mt-3">Password</label>
        <input id="password"
               type="password"
               placeholder="Password"
               required
               class="form-control"
               v-model="password"
        />

        <p class="text-center mt-3">Email and password are required</p>

        <button type="submit" class="btn btn-primary mt-4 w-100">Register</button>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>