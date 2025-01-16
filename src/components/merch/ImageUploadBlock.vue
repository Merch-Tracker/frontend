<script>
import router from "@/router/index.js";

export default {
  name: "ImageUploadBlock",

  props:{
    merchUuid: {
      type: String,
      required: true,
    }
  },

  data(){
    return {
      selectedFile: null,
      imageUrl: null,
      image: null,
    }
  },

  mounted() {
    this.getImage();
  },

  methods: {
    async uploadImage(){
      if (!this.selectedFile) {
        alert("Click on image first to select image file. Then hit upload.");
        return;
      }

      const payload = new FormData();
      payload.append("Data", this.selectedFile);

      try {
        await this.$store.dispatch("images/uploadImage", {merch_uuid: this.merchUuid, payload});
        await router.push({ name: "collection" });
      }
      catch(error){
        console.log(error);
      }
    },

    async getImage() {
      this.image = await this.$store.dispatch("images/fetchImage", this.merchUuid)
    },

    openFileDialog() {
      this.$refs.fileInput.click();
    },

    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        this.imageUrl = URL.createObjectURL(this.selectedFile);
      }
    },
  },

  beforeDestroy() {
    if (this.imageUrl) {
      URL.revokeObjectURL(this.imageUrl);
    }
  },
}
</script>

<template>
  <div class="d-flex flex-column align-items-center">
    <form method="POST" @submit.prevent="uploadImage">
      <div @click="openFileDialog" class="custom-hover-image">
        <img v-if="!selectedFile && !image"
             src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='640' viewBox='0 0 400 640'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='20' fill='%23000000'><tspan x='50%' dy='-1.2em'>Click here</tspan><tspan x='50%' dy='1.2em'>to select</tspan><tspan x='50%' dy='1.2em'>image</tspan></text></svg>"
             class="card-img-top img-fluid w-auto mb-3 mb-md-0"
             alt="Placeholder"
             width="400"
             height="640">

        <img v-if="image" :src="image"
             class="card-img-top img-fluid w-auto mb-3 mb-md-0"
             alt="Selected Image"
             width="400"
             height="640">

        <img v-else :src="imageUrl"
             class="card-img-top img-fluid w-auto mb-3 mb-md-0"
             alt="Selected Image"
             width="400"
             height="640">
      </div>
      <input
          type="file"
          ref="fileInput"
          @change="handleFileChange"
          style="display: none"
      />
      <button class="btn btn-secondary mt-2 mb-3 w-100" type="submit">Upload</button>
    </form>
  </div>
</template>

<style scoped>

</style>