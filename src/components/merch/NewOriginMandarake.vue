<script>
export default {
  name: "NewOriginMandarake",

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
      data: {},
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

    "localData.merch.name"(newName) {
      this.updateLink(newName);
    },

    isChecked(newChecked) {
      if (newChecked) {
        this.updateLink(this.localData.merch.name);
      } else {
        this.localData.data.link = '';
      }
    },
  },

  methods: {
    updateLink(name) {
      if (this.isChecked) {
        this.localData.data.link = `https://order.mandarake.co.jp/order/listPage/list?soldOut=1&keyword=${name}`;
      }
    },
  },

  mounted() {
    this.localData.merch.origin = "mandarake";
    this.localData.data = {};
    this.updateLink(this.localData.merch.name);
  },
}
</script>

<template>
  <div>
    <input type="checkbox" id="del" class="form-check-input" v-model="isChecked" />
    <label for="del" class="form-check-label ms-2">Autocomplete link from name</label>
  </div>

  <label for="link" class="form-label mt-2">Link</label>
  <input type="text"
         class="form-control"
         id="link"
         placeholder="Enter link name"
         v-model="localData.data.link"
         required>

  <div class="invalid-feedback">
    Please enter the link.
  </div>
</template>

<style scoped>

</style>