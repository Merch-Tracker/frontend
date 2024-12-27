<script>
import router from "@/router/index.js";

export default {
  name: "DetailedView",

  computed: {
    merchUuid(){
      return this.$route.params.id;
    },

    details(){
      return this.$store.getters["merch/getMerchByUuid"](this.merchUuid);
    }
  },

  data(){
    return {
      merchName : "",
      merchLink : "",
      selectedFile: null,
      imageUrl: null,
    }
  },

  watch: {
    details: {
      immediate: true,
      handler(newDetails) {
        if (newDetails) {
          this.merchName = newDetails.name;
          this.merchLink = newDetails.link;
        }
      }
    }
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
        // await router.push({ name: "collection" });
      }
      catch(error){
        console.log(error);
      }
    },

    async updateMerch(){
      const payload = {
        name: this.merchName,
        link: this.merchLink,
      };

      try {
        await this.$store.dispatch("merch/updateMerch", {merch_uuid: this.merchUuid, payload});
        await router.push({ name: "collection" });
      }
      catch(error){
        console.log(error);
      }
    },

    async deleteMerch(){
      try {
        await this.$store.dispatch("merch/deleteMerch", this.merchUuid);
        await router.push({ name: "collection" });
      }

      catch(error){
        console.log(error);
      }
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
      URL.revokeObjectURL(this.imageUrl);  // Освобождение URL при уничтожении компонента
    }
  },
}
</script>

<template>
  <h1 class="text-center mt-3">Detailed information</h1>

    <div class="card mt-3 d-flex flex-column flex-md-row shadow-sm">
      <div class="card-body d-flex flex-column flex-md-row">
        <div class="d-flex flex-column align-items-center">
          <form method="POST" @submit.prevent="uploadImage">
            <div @click="openFileDialog" class="custom-hover-image">
              <img v-if="!selectedFile"
                   src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='20' fill='%23000000'>Click here to select image</text></svg>"
                   class="card-img-top img-fluid w-auto mb-3 mb-md-0"
                   alt="Placeholder"
                   width="400"
                   height="225">
              <img v-else :src="imageUrl"
                   class="card-img-top img-fluid w-auto mb-3 mb-md-0"
                   alt="Selected Image"
                   width="400"
                   height="225">
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

        <form method="POST" @submit.prevent="uploadImage">
          <div class="ms-md-3 row">
            <h6 class="custom-small-text">ID: {{ details.MerchUuid }}</h6>
            <div class="mt-2 col-12">
              <label for="name" class="form-label">Merch name</label>
              <input type="text"
                     class="form-control"
                     id="name"
                     v-model=merchName
                     placeholder="Enter merch name"
                     required
              >
            </div>
            <div class="mt-2 col-12">
              <label for="link" class="form-label">Merch link</label>
              <input type="text"
                     class="form-control"
                     id="link"
                     v-model=merchLink
                     placeholder="Enter url here"
                     required
              >
            </div>
            <div class="mt-2 col-12">
              <button class="btn btn-success w-100" type="submit">Update</button>
            </div>
          </div>
        </form>
      </div>
    </div>

  <div class="card mt-3 d-flex flex-md-row shadow-sm justify-content-around p-3">
      <div>Old price: <strong style="color: darkorange">{{ details.old_price }}</strong></div>
      <div>Current price: <strong style="color: darkcyan">{{ details.new_price }}</strong></div>
      <div>Difference: <strong style="color: red">{{ details.new_price - details.old_price }}</strong></div>
  </div>
  <div class="card mt-3 shadow-sm p-3">
    <p class="card-text text-center">Added: {{ details.created_at }}</p>
    <p class="card-text text-center">Updated: {{ details.updated_at }}</p>
    <p class="card-text text-center">Placeholder for some other information</p>
  </div>
  <div class="mt-5 d-flex justify-content-center">
    <button class="btn w-75 btn-danger btn-lg" @click="deleteMerch">Delete</button>
  </div>
</template>

<style>
.custom-small-text {
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6);
}

.custom-hover-image {
  border: 2px solid transparent;
  transition: border-color 0.3s;
}

.custom-hover-image:hover {
  border-color: #86b7fe;
}
</style>
