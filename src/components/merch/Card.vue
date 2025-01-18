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
    <div class="card shadow" style="aspect-ratio: 4/7">
      <div class="d-flex justify-content-center">
        <img v-if="image"
             :src="image"
             class="card-img-top w-100 h-auto"
             alt="Placeholder">

        <img v-else
             src="@/assets/icons/box.svg"
             class="card-img-top w-75 mt-5 h-auto"
             alt="Placeholder">
      </div>

      <div class="p-3 d-flex flex-column">
        <p class="card-text">Name: <strong>{{ name }}</strong></p>
        <p class="card-text"><a :href="link" target="_blank" @click.stop>View on site</a></p>
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
  </router-link>
</template>

<style scoped>
.custom-no-underline{
  text-decoration: none;
  color: inherit;
}

.card:hover {
  border-color: #007bff;
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
}
</style>
