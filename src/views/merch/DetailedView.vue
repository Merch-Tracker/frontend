<script>
import router from "@/router/index.js";
import MerchCardLabelBlock from "@/components/labels/MerchCardLabelBlock.vue";
import PriceHistoryBlock from "@/components/merch/PriceHistoryBlock.vue";
import CurrentPricesBlock from "@/components/merch/CurrentPricesBlock.vue";
import ImageUploadBlock from "@/components/merch/ImageUploadBlock.vue";
import DetailedOriginSurugaya from "@/components/merch/DetailedOriginSurugaya.vue";
import DetailedOriginMandarake from "@/components/merch/DetailedOriginMandarake.vue";

export default {
  name: "DetailedView",
  components: {
    DetailedOriginMandarake,
    DetailedOriginSurugaya, ImageUploadBlock, CurrentPricesBlock, PriceHistoryBlock, MerchCardLabelBlock},

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
      merchInfo: {
        merch: {
          name: "",
          origin: "",
          merch_uuid: "",
        },
        data: {}
      },

      allowDelete: false,
    }
  },

  methods: {
    async updateMerch(){
      const payload = {
        merch: {
          name: this.details.merch.name,
          origin: this.details.merch.origin,
          merch_uuid: this.details.merch.merch_uuid,
        },
        data: this.merchInfo.data,
      };

      try {
        await this.$store.dispatch("merch/updateMerch", payload);
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
      const payload = {
        merch: {
          origin: this.details.merch.origin,
          merch_uuid: this.details.merch.merch_uuid,
        }
      }

      try {
        await this.$store.dispatch("merch/deleteMerch", payload);
        await router.push({ name: "collection" });
      }

      catch(error){
        console.log(error);
      }
    },

    updateNewMerch(updatedValue){
      this.merchInfo = updatedValue;
    }
  },
}
</script>

<template>
  <h1 class="text-center mt-3">Detailed information</h1>
  <div class="card mt-3 shadow-sm">
    <div class="card-body">
      <form method="POST" @submit.prevent="updateMerch" class="row">
        <div class="col-md-3">
          <ImageUploadBlock :merchUuid="merchUuid" />
        </div>

        <div class="col-md-9">
<!--          temp block-->
          <div class="mb-3"><a :href="`https://order.mandarake.co.jp/order/listPage/list?soldOut=1&keyword=${this.merchInfo.merch.name}`" target="_blank" @click.stop>View on mandarake</a></div>

          <div v-if="details.merch.origin === 'surugaya'">
            <DetailedOriginSurugaya
                :details="details"
                @input="updateNewMerch"
            />
          </div>

          <div v-else-if="details.merch.origin === 'mandarake'">
            <DetailedOriginMandarake
                :details="details"
                @input="updateNewMerch"
            />
          </div>

          <div class="mt-2">
            <button class="btn btn-success w-100" type="submit" @click.prevent="updateMerch">Update</button>
          </div>
        </div>
      </form>
    </div>
  </div>

  <CurrentPricesBlock :details="details.prices" />
  <MerchCardLabelBlock />
  <PriceHistoryBlock :merchUuid="details.merch.merch_uuid" />

  <div class="card mt-3 shadow-sm p-3">
    <p class="card-text text-center">Added: {{ details.merch.created_at }}</p>
    <p class="card-text text-center">Updated: {{ details.merch.updated_at }}</p>
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
