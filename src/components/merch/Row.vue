<script>
export default {
  name: "MerchRow"
}
</script>

<template>
<div class="card mt-2 d-flex flex-column flex-md-row shadow-sm">
  <img src="https://placehold.co/300x200" class="card-img-top img-fluid w-auto" alt="Placeholder">
  <div class="card-body">
    <h5 class="card-title">Заголовок карточки</h5>
    <p class="card-text">Это текст карточки, который находится под изображением на мобильных устройствах и справа на компьютерах. Здесь можно разместить дополнительную информацию.</p>
    <div class="d-flex flex-column flex-md-row justify-content-end">
      <div class="text-end me-md-3">
        <span>Старая цена: <strong style="color: green">10 000</strong></span>
      </div>
      <div class="text-end me-md-3">
        <span>Новая цена: <strong style="color: red">20 000</strong></span>
      </div>
      <div class="text-end">
        <span>Изменение: <strong style="color: red">↑100%</strong></span>
      </div>
    </div>
    <div class="btn-group">
      <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
      <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
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