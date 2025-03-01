<script>
export default {
  name: 'DetailedOriginSurugaya',
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

  <div class="mt-2 col-12">
    <label for="link" class="form-label">Parse tag</label>
    <input type="text"
           class="form-control"
           id="parse_tag"
           v-model=localData.data.parse_tag
           placeholder="Enter parse tag here without <>"
    >
  </div>

  <div class="mt-2 col-12">
    <label for="link" class="form-label">Parse substring</label>
    <input type="text"
           class="form-control"
           id="parseTag"
           v-model=localData.data.parse_substring
           placeholder="Enter parse substring here"
    >
  </div>

  <div class="mt-2 col-12">
    <label for="link" class="form-label">Cookie values</label>
    <input type="text"
           class="form-control"
           id="parseTag"
           v-model=localData.data.cookie_values
           placeholder="Enter cookie values here"
    >
  </div>

  <div class="mt-2 col-12">
    <label for="link" class="form-label">Separator</label>
    <input type="text"
           class="form-control"
           id="parseTag"
           v-model=localData.data.separator
           placeholder="Enter separator here"
    >
  </div>
</template>

<style scoped>

</style>