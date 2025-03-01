<script>
export default {
  name: "NewOriginSurugaya",

  emits: ['input'],

  props: {
    value: {
      type: Object,
      required: true,
    }
  },

  data() {
    return {
      localData: {
        ...this.value,
      },
      isChecked: true,
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
    this.localData.merch.origin = "surugaya";
    this.localData.data = {};
    this.localData.data.link = "";
    this.localData.data.parse_tag = "strong";
    this.localData.data.parse_substring = "¥￥";
    this.localData.data.cookie_values ="safe_search_expired=2;safe_search_option=3";
    this.localData.data.separator = "~";
  },
}
</script>

<template>
  <div class="col-12">
    <label for="link" class="form-label">Link</label>
    <input type="text"
           class="form-control"
           id="link"
           placeholder="Enter link name"
           v-model="localData.data.link"
           required>

    <div class="invalid-feedback">
      Please enter the link.
    </div>
  </div>

  <div class="mt-2 col-12">
    <label for="parse_tag" class="form-label">Parse tag</label>
    <input type="text"
           class="form-control"
           id="parse_tag"
           placeholder="Enter parse tag here without <>"
           v-model="localData.data.parse_tag"
    >
  </div>

  <div class="mt-2 col-12">
    <label for="parse_substring" class="form-label">Parse substring</label>
    <input type="text"
           class="form-control"
           id="parse_substring"
           placeholder="Enter parse substring here"
           v-model="localData.data.parse_substring"
    >
  </div>

  <div class="mt-2 col-12">
    <label for="cookie_values" class="form-label mt-">Cookie values</label>
    <input type="text"
           class="form-control"
           id="cookie_values"
           placeholder="Enter cookie values here"
           v-model="localData.data.cookie_values"
    >
  </div>

  <div class="mt-2 col-12">
    <label for="separator" class="form-label mt-">Separator</label>
    <input type="text"
           class="form-control"
           id="separator"
           placeholder="Enter separator here"
           v-model="localData.data.separator"
    >
  </div>
</template>

<style scoped>

</style>