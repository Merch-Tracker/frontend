<script>
import router from "@/router/index.js";
import {onMounted, ref} from "vue";

export default {
  name: "SuccessView",

  setup() {
    const seconds = ref(5);

    onMounted(() => {
      const timer = setInterval(() => {
        seconds.value--;
        if (seconds.value <= 0) {
          clearInterval(timer);
          router.push({ name: "login" });
        }
      }, 1000);
    });

    return {
      seconds,
    };
  },
}
</script>

<template>
  <h2 class="text-center mt-3">Account registered successfully</h2>
  <h4 class="text-center">Now you will be redirected to login form in {{ seconds }} seconds...</h4>
</template>

<style scoped>

</style>