<script>
import {mapActions} from "vuex";
import router from "@/router/index.js";
import NewOriginSurugaya from "@/components/merch/NewOriginSurugaya.vue";
import NewOriginMandarake from "@/components/merch/NewOriginMandarake.vue";

export default {
  name: "NewMerchView",
  components: {NewOriginMandarake, NewOriginSurugaya},

  data(){
    return {
      origin: "surugaya",
      merchName: "",

      newMerch: {
        merch: {
          name: "",
          origin: "",
        },
        data: {}
      }
    }
  },

  methods: {
    ...mapActions("merch", ["createMerch"]),
    async submitNewMerch(){
      try {
        await this.createMerch(this.newMerch);
        await router.push({ name: "collection" });
      }
      catch(error){
        console.error(error);
      }
    },

    switchOrigin(o){
      this.origin = o;
    },

    updateNewMerch(updatedValue){
      this.newMerch = updatedValue;
    },
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
                   v-model="newMerch.merch.name"
            >
            <div class="invalid-feedback">
              Please enter a name for new record.
            </div>
          </div>

          <ul class="nav nav-tabs">
            <li class="nav-item">
              <p class="nav-link"
                 aria-current="page"
                 :class="origin === 'surugaya' ? 'active' : ''"
                 @click="switchOrigin('surugaya')"
              >suruga-ya.jp</p>
            </li>

            <li class="nav-item">
              <p class="nav-link"
                 aria-current="page"
                 :class="origin === 'mandarake' ? 'active' : ''"
                 @click="switchOrigin('mandarake')"
              >mandarake.co.jp</p>
            </li>
          </ul>

          <div v-if="origin === 'surugaya'">
            <NewOriginSurugaya
                :value="newMerch"
                @input="updateNewMerch"
            />
          </div>

          <div v-else-if="origin === 'mandarake'">
            <NewOriginMandarake
                :value="newMerch"
                @input="updateNewMerch"
            />
          </div>

          <hr class="my-4">
          <button class="w-100 btn btn-primary btn-lg" type="submit">Create new record</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>