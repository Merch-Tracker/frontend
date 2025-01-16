<script>
import {defineComponent} from "vue";
import Navbar from "@/components/Navbar.vue";
import {mapActions} from "vuex";
import FooterBlock from "@/components/FooterBlock.vue";

export default defineComponent({
  components: {FooterBlock, Navbar},

  methods: {
    ...mapActions("userData", ["getUserData"]),
  },

  created() {
    this.$store.dispatch("initStore")
  },
})
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <Navbar />
    <div class="container flex-grow-1" style="padding-top: 60px">
      <RouterView />
    </div>
    <FooterBlock />
  </div>
</template>

<style>
</style>
