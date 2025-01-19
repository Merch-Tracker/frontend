<script>
import {mapActions} from "vuex";
import router from "@/router/index.js";

export default {
  name: "NewMerchView",

  data(){
    return {
      newMerchData: {
        name: "",
        link: "",
        parse_tag: "strong",
        parse_substring: "¥￥",
        cookie_values: "safe_search_expired=2;safe_search_option=3",
        separator: "~",
      }
    }
  },

  methods: {
    ...mapActions("merch", ["newMerch"]),
    async submitNewMerch(){
      try {
        await this.newMerch(this.newMerchData);
        await router.push({ name: "collection" });
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
            <label for="name" class="form-label">Record name</label>
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
            <label for="link" class="form-label">Link</label>
            <input type="text"
                   class="form-control"
                   id="link"
                   placeholder="Enter link name"
                   required
                   v-model="newMerchData.link"
            >
            <div class="invalid-feedback">
              Please enter the link.
            </div>
          </div>

          <ul class="nav nav-tabs">
            <li class="nav-item">
              <p class="nav-link active" aria-current="page">suruga-ya.jp</p>
            </li>
          </ul>
          <div class="mt-2 col-12">
            <label for="parse_tag" class="form-label">Parse tag</label>
            <input type="text"
                   class="form-control"
                   id="parse_tag"
                   v-model="newMerchData.parse_tag"
                   placeholder="Enter parse tag here without <>"
            >
          </div>

          <div class="mt-2 col-12">
            <label for="parse_substring" class="form-label">Parse substring</label>
            <input type="text"
                   class="form-control"
                   id="parse_substring"
                   v-model="newMerchData.parse_substring"
                   placeholder="Enter parse substring here"
            >
          </div>

          <div class="mt-2 col-12">
            <label for="cookie_values" class="form-label mt-">Cookie values</label>
            <input type="text"
                   class="form-control"
                   id="cookie_values"
                   v-model="newMerchData.cookie_values"
                   placeholder="Enter cookie values here"
            >
          </div>

          <div class="mt-2 col-12">
            <label for="separator" class="form-label mt-">Separator</label>
            <input type="text"
                   class="form-control"
                   id="separator"
                   v-model="newMerchData.separator"
                   placeholder="Enter separator here"
            >
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