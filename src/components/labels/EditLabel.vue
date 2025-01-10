<script>
import LabelTemplate from "@/components/labels/LabelTemplate.vue";
import router from "@/router/index.js";

export default {
  name: "EditLabel" ,
  components: {LabelTemplate},

  computed: {
    LabelUuid() {
      return this.$route.params.id;
    },

    details(){
      return this.$store.getters["labels/getLabelByUuid"](this.LabelUuid);
    },
  },

  data(){
    return {
      name: "",
      color: "#EF2D56FF",
      bg_color: "#FFFFFF",
    }
  },

  watch: {
    details: {
      immediate: true,
      handler(newDetails) {
        if (newDetails) {
          this.name = newDetails.name;
          this.color = newDetails.color;
          this.bg_color = newDetails.bg_color
        }
      }
    }
  },

  methods:{
    async updateLabel(){
      const payload = {
        name: this.name,
        color: this.color,
        bg_color: this.bg_color,
      }

      try{
        const response = await this.$store.dispatch("labels/updateLabel", {label_uuid: this.LabelUuid, payload});
        if (response && response.status === 200) {
          await router.push({name: "personal"});
        }
      }
      catch(error){
        console.log(error);
      }
    },

    async deleteLabel(){
      try{
        const response = await this.$store.dispatch("labels/deleteLabel", {label_uuid: this.LabelUuid});
        if (response && response.status === 204) {
          await router.push({name: "personal"});
        }
      }
      catch(error){
        console.log(error);
      }
    },
  },
}
</script>

<template>
  <div class="container">
    <form method="POST" @submit.prevent=updateLabel>
      <h5 class="text-center mt-2">Edit label</h5>

      <label class="mt-2" for="name">Name</label>
      <input class="form-control" type="text" id="name" v-model="name" placeholder="Label name"/>

      <label class="mt-2" for="color">Color</label>
      <input class="form-control" type="color" id="color" v-model="color"/>

      <label class="mt-2" for="bg_color">Background color</label>
      <input class="form-control" type="color" id="bg_color" v-model="bg_color"/>

      <p class="mt-2 text-center">Preview: <LabelTemplate :text=name :color=color :bgcolor=bg_color></LabelTemplate></p>

      <button type="submit" class="btn btn-primary mt-2 w-100">Update</button>
    </form>
  </div>
  <div class="container mt-2">
    <button class="btn btn-danger mt-2 w-100" @click="deleteLabel">Delete</button>
  </div>
</template>

<style scoped>

</style>