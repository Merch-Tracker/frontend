<script>
export default {
  name: "DetailedOriginMandarake",

  props: {
    details: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      localData: {
        ...this.details,
      },
    };
  },

  watch: {
    localData: {
      handler(newValue) {
        this.$emit("input", newValue);
      },
      deep: true,
    },
  },

  mounted() {
    this.$emit("input", this.localData);
  },
}
</script>

<template>
  <h6 class="custom-small-text">ID: {{ localData.merch.merch_uuid }}</h6>
  <h6 class="custom-small-text">Origin: {{ localData.merch.origin }}</h6>
  <div class="mt-2 col-12">
    <label for="name" class="form-label">Merch name</label>
    <input type="text"
           class="form-control"
           id="name"
           v-model=localData.merch.name
           placeholder="Enter merch name"
           required
    >
  </div>

  <div class="mt-2 col-12">
    <label for="link" class="form-label">Merch link</label>
    <input type="text"
           class="form-control"
           id="link"
           v-model=localData.data.link
           placeholder="Enter url here"
           required
    >
  </div>
</template>

<style scoped>

</style>