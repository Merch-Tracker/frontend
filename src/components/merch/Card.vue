<script>
import {mapGetters, mapState} from "vuex";
import axios from "axios";

export default {
  name: "MerchCard",
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
  },

  data() {
    return {
      image: null,
    };
  },

  computed: {
    ...mapGetters("authAndToken", ["token"]),
  },

  mounted() {
    this.fetchImage();
  },
  methods: {
    async fetchImage() {
      try {
        const response = await axios.get(`/images/${this.uuid}`, {
          headers: this.getHeaders(this.rootState),
          responseType: 'blob',
        });

        if (response.status === 200) {
          this.image = URL.createObjectURL(response.data);
        } else if (response.status === 204) {
          this.image = null;
        }

      } catch (error) {
        console.error('Error fetching image:', error);
      }
    },

    getHeaders() {
      return {
        Authorization: `Bearer ${this.token}`,
      };
    },
  },
}
</script>

<template>
  <router-link :to="{ name: 'merchdetail', params: { id: uuid } }" class="custom-no-underline">
    <div class="col">
      <div class="card shadow-sm">
        <img v-if="image"
             :src="image"
             class="card-img-left"
             width="400"
             height="225"
             alt="Placeholder">

        <img v-else
             src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='20' fill='%23000000'>Image placeholder</text></svg>"
             class="card-img-left"
             width="400"
             height="225"
             alt="Placeholder">

        <div class="card-body">
          <p class="card-text">Name: <strong>{{ name }}</strong></p>
          <p class="card-text">Link: <strong>{{ link }}</strong></p>
          <p class="card-text">
            <span class="me-3">Price: <strong>{{ new_price }}</strong></span>
            <span class="me-3">Old price: <strong>{{ old_price }}</strong></span>
          </p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
              <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
            </div>
            <small class="text-body-secondary">9 mins</small>
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