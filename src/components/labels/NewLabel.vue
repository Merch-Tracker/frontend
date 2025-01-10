<script>
import LabelTemplate from "@/components/labels/LabelTemplate.vue";

export default {
  name: "NewLabel",
  components: {LabelTemplate},

  data(){
    return {
      name: "",
      color: "#EF2D56FF",
      bg_color: "#FFFFFF",
    }
  },

  methods:{
    async createNewLabel(){
      const payload = {
        name: this.name,
        color: this.color,
        bg_color: this.bg_color,
      }

      try{
        await this.$store.dispatch("labels/newLabel", payload);
      }
      catch(error){
        console.log(error);
      }
    }
  },
}
</script>

<template>
  <div class="container">
    <form method="POST" @submit.prevent=createNewLabel>
      <h5 class="text-center mt-2">Create new label</h5>

      <label class="mt-2" for="name">Name</label>
      <input class="form-control" type="text" id="name" v-model="name" placeholder="Label name"/>

      <label class="mt-2" for="color">Color</label>
      <input class="form-control" type="color" id="color" v-model="color"/>

      <label class="mt-2" for="bg_color">Background color</label>
      <input class="form-control" type="color" id="bg_color" v-model="bg_color"/>

      <p class="mt-2 text-center">Preview: <LabelTemplate :text=name :color=color :bgcolor=bg_color></LabelTemplate></p>

      <button type="submit" class="btn btn-primary mt-2 w-100">Create</button>
    </form>
  </div>
</template>

<style scoped>

</style>