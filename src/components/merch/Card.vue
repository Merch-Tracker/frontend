<script>
import {mapGetters} from "vuex";
import LabelTemplate from "@/components/labels/LabelTemplate.vue";

export default {
  name: "MerchCard",
  components: {LabelTemplate},
  props: {
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    uuid: {
      type: String,
      required: true,
    },
    old_price: {
      type: Number,
      required: true,
    },
    new_price: {
      type: Number,
      required: true,
    },
    labels: {
      type: Array,
    },
  },

  data() {
    return {
      image: null,
      cardsLabels: [],
    };
  },

  computed: {
    ...mapGetters("authAndToken", ["token"]),
    ...mapGetters("labels", ["getUserLabels"]),
  },

  mounted() {
    this.getImage();
    this.makeLabels();
  },

  methods: {
    async getImage() {
      this.image = await this.$store.dispatch("images/fetchImage", this.uuid)
    },

    makeLabels(){
      if (this.labels) {
        const userLabels = this.getUserLabels;
        this.cardsLabels = userLabels.filter(label => this.labels.includes(label.LabelUuid));
      }
    },
  },
}
</script>

<template>
  <router-link :to="{ name: 'merchdetail', params: { id: uuid } }" class="custom-no-underline">
    <div class="col">
      <div class="card shadow-sm p-0" style="max-width: 400px;">
        <div class="d-flex justify-content-center">
        <img v-if="image"
             :src="image"
             class="card-img-top w-100"
             style="height: auto;"
             alt="Placeholder">

        <img v-else
             src=""
             class="card-img-top w-100"
             style="height: auto;"
             alt="Placeholder">
        </div>

        <div class="card-body">
          <p class="card-text">Name: <strong>{{ name }}</strong></p>
          <p class="card-text">
            <span class="me-3">Price: <strong>{{ new_price }}</strong></span>
            <span class="me-3">Old price: <strong>{{ old_price }}</strong></span>
          </p>
          <div class="d-flex justify-content-start">
            <div v-for="label in cardsLabels" :key="label" class="me-2">
              <LabelTemplate :text="label.name" :color="label.color" :bg_color="label.bg_color" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.card:hover {
  border-color: #007bff;
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
}
</style>
