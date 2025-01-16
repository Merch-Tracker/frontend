<script>
import {mapGetters} from "vuex";

export default {
  name: "HomeView",

  computed:{
    ...mapGetters("authAndToken", ["isAuth"]),
  },
}
</script>

<template>
  <div>
    <h1 class="text-center">Welcome to merch parsing service</h1>

    <div v-if="!isAuth">
      <h2 class="text-center mt-3">
        <router-link :to="{ name : 'login' }">Log in</router-link> to proceed.
      </h2>

      <h2 class="text-center mt-3">
        Or <router-link :to="{ name : 'register' }">register</router-link> if you're new to this service!
      </h2>
    </div>

    <div v-if="isAuth">
      <div class="mt-5">
        <h2>Available actions:</h2>
        <ul>
          <li>
            Proceed to your
            <router-link :to="{ name : 'collection' }">collection</router-link>
            to browse merch, or
            <router-link :to="{ name : 'merchnew' }">add a new record</router-link>.
          </li>
          <li>
            Add or edit merch labels in
            <router-link :to="{ name : 'personal' }">personal page</router-link>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>
