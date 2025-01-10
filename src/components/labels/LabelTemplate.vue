<script>
export default {
  name: "LabelTemplate",

  props: {
    text: {type: String, required: true, default: "label"},
    color: {type: String, default: "#EF2D56FF"},
    bg_color: {type: String, default: "#FFFFFF"},
  },
}
</script>

<template>
  <label class="custom_label"
         :style="{color: color, backgroundColor: bg_color, borderColor: color}"
         >
    {{ text }}
  </label>
</template>

<style scoped>
.custom_label {
  font-family: 'Heebo', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.025rem;
  font-style: normal;
  text-transform: uppercase;
  border-radius: 1.25rem;
  -webkit-border-radius: 1.25rem;
  -moz-border-radius: 1.25rem;
  padding: 0.35rem 0.75rem;
  border-style: solid;
  border-width: 0.125rem;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  -box-shadow: none;
}
</style>