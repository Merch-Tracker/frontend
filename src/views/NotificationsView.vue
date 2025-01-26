<script>
import {mapGetters} from "vuex";
import NotificationCard from "@/components/notifications/NotificationCard.vue";


export default {
  name: "NotificationsView",
  components: {NotificationCard},

  computed: {
    ...mapGetters("notifications", ["notificationsList"]),

    groupedNotes() {
      return this.notifications.reduce((acc, note) => {
        const date = this.formatDate(note.created_at)
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(note);
        return acc;
      }, {});
    },
  },

  data(){
    return {
      notifications: [],
      number: 0,
    }
  },

  methods: {
    async getNotifications(){
      this.notifications = this.notificationsList;
    },

    formatDate(entry){
      const date = new Date(entry);
      const day = date.getDate();
      const month = date.toLocaleString('en-US', { month: 'long' });
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    },
  },

  mounted() {
    this.getNotifications();
    this.interval = setInterval(() => {
      this.$store.dispatch('notifications/sendSeen');
    }, 5000);
  },

  beforeDestroy () {
    clearInterval(this.interval);
    clearInterval(this.interval);
  },
}
</script>

<template>
  <div>
    <div v-for="(notes, date) in groupedNotes" :key="date" class="mt-3">
      <h2 class="text-center">{{ date }}</h2>
      <hr class="border-secondary my-3">
      <NotificationCard v-for="item in notes" :key="item.note_id" :noteData="item" />
    </div>
  </div>
</template>

<style scoped>

</style>