<script>
import {mapGetters} from "vuex";
import LabelTemplate from "@/components/labels/LabelTemplate.vue";

export default {
  name: "MerchCard",
  components: {LabelTemplate},
  props: {
    attrs: {
      type: Object,
      required: false,
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
      this.image = await this.$store.dispatch("images/fetchImage", this.attrs.merch.merch_uuid)
    },

    makeLabels(){
        const userLabels = this.getUserLabels;
        this.cardsLabels = userLabels.filter(label => this.attrs.labels.includes(label.LabelUuid));
    },
  },
}
</script>

<template>
  <router-link :to="{ name: 'merchdetail', params: { id: attrs.merch.merch_uuid } }" class="custom-no-underline">
    <div class="card shadow mb-3" style="aspect-ratio: 4/7">
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
        <p class="card-text"><strong>{{ attrs.merch.name }}</strong></p>
        <p class="card-text"><a :href="attrs.data.link" target="_blank" @click.stop>View on site</a></p>
        <p class="card-text">
          <span class="me-3">Price: <strong>{{ attrs.prices[0] }}</strong></span>
          <span class="me-3">Old price: <strong>{{ attrs.prices[1] }}</strong></span>
        </p>
        <div><a :href="`https://order.mandarake.co.jp/order/listPage/list?soldOut=1&keyword=${attrs.merch.name}`" target="_blank" @click.stop>View on mandarake</a></div>
        <div class="d-flex justify-content-start">
          <div v-for="label in cardsLabels" :key="label" class="mt-1 me-2">
            <LabelTemplate :text="label.name" :color="label.color" :bg_color="label.bg_color" />
          </div>
        </div>
      </div>
      <div class="d-flex flex-column p-3">
        <h6 class="custom-small-text">Origin: {{ attrs.merch.origin }}</h6>
        <h6 class="custom-small-text">{{ attrs.merch.merch_uuid }}</h6>
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
