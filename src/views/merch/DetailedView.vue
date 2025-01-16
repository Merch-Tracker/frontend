<script>
import router from "@/router/index.js";
import MerchCardLabelBlock from "@/components/labels/MerchCardLabelBlock.vue";
import PriceHistoryBlock from "@/components/merch/PriceHistoryBlock.vue";
import CurrentPricesBlock from "@/components/merch/CurrentPricesBlock.vue";
import ImageUploadBlock from "@/components/merch/ImageUploadBlock.vue";

export default {
  name: "DetailedView",
  components: {ImageUploadBlock, CurrentPricesBlock, PriceHistoryBlock, MerchCardLabelBlock},

  computed: {
    merchUuid(){
      return this.$route.params.id;
    },

    details(){
      return this.$store.getters["merch/getMerchByUuid"](this.merchUuid);
    },
  },

  data(){
    return {
      allowDelete: false,
      merchName : "",
      merchLink : "",
      merchParseTag: "",
      merchParseSubstring: "",
      merchCookieValues: "",
      merchSeparator: "",
    }
  },

  watch: {
    details: {
      immediate: true,
      handler(newDetails) {
        if (newDetails) {
          this.merchName = newDetails.name;
          this.merchLink = newDetails.link;
          this.merchParseTag = newDetails.parse_tag
          this.merchParseSubstring = newDetails.parse_substring
          this.merchCookieValues = newDetails.cookie_values
          this.merchSeparator = newDetails.separator
        }
      }
    }
  },

  methods: {
    async updateMerch(){
      const payload = {
        name: this.merchName,
        link: this.merchLink,
        parse_tag: this.merchParseTag,
        parse_substring: this.merchParseSubstring,
        cookie_values: this.merchCookieValues,
        separator: this.merchSeparator,
      };

      try {
        await this.$store.dispatch("merch/updateMerch", {merch_uuid: this.merchUuid, payload});
        await router.push({ name: "collection" });
      }
      catch(error){
        console.log(error);
      }
    },

    toggleCheck(){
      this.allowDelete = !!this.allowDelete
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
  },
}
</script>

<template>
  <h1 class="text-center mt-3">Detailed information</h1>
    <div class="card mt-3 d-flex flex-column flex-md-row shadow-sm">
      <div class="card-body d-flex flex-column flex-md-row">
        <ImageUploadBlock :merchUuid="merchUuid" />

        <form method="POST" @submit.prevent="updateMerch">
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
              <label for="link" class="form-label">Parse tag</label>
              <input type="text"
                     class="form-control"
                     id="parse_tag"
                     v-model=merchParseTag
                     placeholder="Enter parse tag here without <>"
              >
            </div>

            <div class="mt-2 col-12">
              <label for="link" class="form-label">Parse substring</label>
              <input type="text"
                     class="form-control"
                     id="parseTag"
                     v-model=merchParseSubstring
                     placeholder="Enter parse substring here"
              >
            </div>

            <div class="mt-2 col-12">
              <label for="link" class="form-label">Cookie values</label>
              <input type="text"
                     class="form-control"
                     id="parseTag"
                     v-model=merchCookieValues
                     placeholder="Enter cookie values here"
              >
            </div>

            <div class="mt-2 col-12">
              <label for="link" class="form-label">Separator</label>
              <input type="text"
                     class="form-control"
                     id="parseTag"
                     v-model=merchSeparator
                     placeholder="Enter separator here"
              >
            </div>


            <div class="mt-2 col-12">
              <button class="btn btn-success w-100" type="submit">Update</button>
            </div>
          </div>
        </form>
      </div>
    </div>

  <CurrentPricesBlock :details="details" />
  <MerchCardLabelBlock />
  <PriceHistoryBlock :merchUuid="details.MerchUuid" />

  <div class="card mt-3 shadow-sm p-3">
    <p class="card-text text-center">Added: {{ details.created_at }}</p>
    <p class="card-text text-center">Updated: {{ details.updated_at }}</p>
    <p class="card-text text-center">Placeholder for some other information</p>
  </div>
  <div class="mt-5 d-flex justify-content-center align-items-center">
    <input type="checkbox" id="del" class="form-check-input" v-model="allowDelete" @change="toggleCheck">
    <label for="del" class="form-check-label ms-2">Check to allow delete</label>
  </div>
  <div class="mt-3 d-flex justify-content-center">
    <button class="btn w-75 btn-danger btn-lg" :disabled="!allowDelete" @click="deleteMerch">Delete</button>
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
