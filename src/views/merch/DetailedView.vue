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
    async deleteMerch(){
      try {
        await this.$store.dispatch("merch/deleteMerch", this.merchUuid);
        await router.push({ name: "collection" });
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
      console.log("Payload before dispatch:", payload);
      try {
        await this.$store.dispatch("merch/updateMerch", {merch_uuid: this.merchUuid, payload});
        await router.push({ name: "collection" });
      }
      catch(error){
        console.log(error);
      }
    }
  },
}
</script>

<template>
  <h1 class="text-center mt-3">Detailed information</h1>
  <form method="POST" @submit.prevent="updateMerch">
    <div class="card mt-3 d-flex flex-column flex-md-row shadow-sm">
      <div class="card-body d-flex flex-column flex-md-row">
        <img src="https://placehold.co/400x225" class="card-img-top img-fluid w-auto mb-3 mb-md-0" alt="Placeholder">
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
      </div>
    </div>
  </form>
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
</style>
