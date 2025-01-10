<script>
import NewLabel from "@/components/labels/NewLabel.vue";
import UserLabels from "@/components/labels/UserLabels.vue";

export default {
name: "LabelsBlock",
  components: {UserLabels, NewLabel}
}
</script>

<template>
  <h2 class="text-center mt-2">Labels</h2>
  <div class="card mt-2 p-2">
    <UserLabels />
  </div>

  <div class="card mt-2 p-2">
    <NewLabel/>
  </div>
</template>

<style scoped>

</style>