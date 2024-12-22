<script>
import {defineComponent} from "vue";
import Navbar from "@/components/Navbar.vue";
import {mapActions, mapState} from "vuex";

export default defineComponent({
  components: {Navbar},

  computed: {
    ...mapState({
      user: state => state.user,
    }),
  },

  methods: {
    ...mapActions(["getUserData"]),
  },

  created() {
    this.$store.dispatch("initStore")
    this.getUserData()
  },
})


</script>

<template>
  <Navbar />
  <div class="container" style="padding-top: 60px">
    <RouterView />
  </div>
</template>

<style>
</style>
