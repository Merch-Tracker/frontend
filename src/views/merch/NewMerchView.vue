<script>
import {mapActions} from "vuex";

export default {
  name: "NewMerchView",

  data(){
    return {
      newMerchData: {
        "name": "",
        "link": "",
      }
    }
  },

  methods: {
    ...mapActions("merch", ["newMerch"]),
    async submitNewMerch(){
      try {
        await this.newMerch(this.newMerchData)
      }
      catch(error){
        console.error(error);
      }
    }
  },
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center" style="min-height: 45vh;">
    <div class="col-md-6 col-lg-6">
      <h4 class="mt-3">New record</h4>
      <hr class="my-4 mt-3">
      <form class="needs-validation" novalidate @submit.prevent="submitNewMerch">
        <div class="row g-3">
          <div class="col-12">
            <label for="address" class="form-label">Record name</label>
            <input type="text"
                   class="form-control"
                   id="name"
                   placeholder="Enter merch name"
                   required
                   v-model="newMerchData.name"
            >
            <div class="invalid-feedback">
              Please enter a name for new record.
            </div>
          </div>

          <div class="col-12">
            <label for="address" class="form-label">Link</label>
            <input type="text"
                   class="form-control"
                   id="address"
                   placeholder="Enter link name"
                   required
                   v-model="newMerchData.link"
            >
            <div class="invalid-feedback">
              Please enter the link.
            </div>
          </div>

        </div>

        <hr class="my-4">

        <button class="w-100 btn btn-primary btn-lg" type="submit">Create new record</button>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>