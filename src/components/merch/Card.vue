<script>
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
    }
  },
}
</script>

<template>
<div class="col">
  <div class="card shadow-sm">
    <img src="https://placehold.co/400x225" class="card-img-left" alt="Placeholder">
    <div class="card-body">
      <p class="card-text">Name: <strong>{{ name }}</strong></p>
      <p class="card-text">Link: <strong>{{ link }}</strong></p>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
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
</template>

<style scoped>
.card:hover {
  border-color: #007bff;
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
}
</style>