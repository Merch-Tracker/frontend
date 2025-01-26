<script>
export default {
  name: "NotificationCard",

  props: {
    noteData: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.noteData.seen) {
          setTimeout(() => {
            this.noteData.seen = true;
            this.$store.dispatch("notifications/markAsSeen", this.noteData.note_id)
          }, 1000);
        }
      });
    });

    this.observer.observe(this.$refs.notificationCard);
  },

  beforeDestroy() {
    this.observer.disconnect();
  },

  methods: {
    formatTime(){
      const date = new Date(this.noteData.created_at);
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    },

    formatDate(){
      const date = new Date(this.noteData.created_at);
      const day = date.getDate();
      const month = date.toLocaleString('en-US', { month: 'long' });
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    },
  },
}
</script>

<template>
  <router-link :to="{ name : 'merchdetail', params: { id: noteData.merch_uuid } }" class="custom-no-underline">
    <div class="card mt-3 p-3 d-flex flex-row align-items-center justify-content-between"
         :class="{'unread-shadow': (noteData.seen) === false, 'shadow': noteData.seen === true,}"
         ref="notificationCard">
    <div class="col-6 text-center d-flex">{{ noteData.name }}</div>
    <div class="col-3 text-center d-flex">New price:{{ noteData.price }}</div>
    <div class="col-3 text-center d-flex">{{ formatTime() }} {{ formatDate() }}</div>
    </div>
  </router-link>
</template>

<style scoped>
.unread-shadow{
  box-shadow: 0 0.5rem 1rem rgb(170, 240, 190);
}

.custom-no-underline{
  text-decoration: none;
  color: inherit;
}
</style>