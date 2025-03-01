<script>
export default {
  name: "ParsersView",

  data() {
    return {
      parserData: {
        origin: "",
        start_time: "",
        check_period: 0,
        last_check: "",
        next_check: "",
        num_cpus: 0,
      }
    }
  },

  methods: {
    async getStatus(){
      const r = await this.$store.dispatch("serviceStatus/getServiceStatus");
      this.parserData = {
        origin: r.origin,
        start_time: r.start_time,
        check_period: r.check_period,
        last_check: r.last_check,
        next_check: r.next_check,
        num_cpus: r.num_cpus,
      };
    },

    formatDateTime(dt){
      const date = new Date(dt);
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      const day = date.getDate();
      const month = date.toLocaleString('en-US', { month: 'long' });
      const year = date.getFullYear();
      return `${hours}:${minutes}:${seconds} ${day} ${month} ${year}`;
    },

    formatTime(value){
      const date = new Date(value);
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    },

    formatDate(value){
      const date = new Date(value);
      const day = date.getDate();
      const month = date.toLocaleString('en-US', { month: 'long' });
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    },
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getStatus();
    });
  }
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="col-md-6 col-lg-6">
      <h4 class="mt-3">Parser status</h4>
      <hr class="my-4 mt-3">

      <div v-if="this.parserData.check_period === 0"
           class="mb-3 card p-2 red-border d-flex flex-row justify-content-between align-items-center">
        <img src="@/assets/icons/warning.svg" width="25" height="25" alt="Warning">
        <span>No data available, check if parser is online.</span>
        <img src="@/assets/icons/warning.svg" width="25" height="25" alt="Warning">
      </div>

      <div v-else>
        <table class="table table-striped table-hover">
          <tbody>
            <tr>
              <td>Origin:</td>
              <td>{{ parserData.origin }}</td>
              <td><span style="color: #20c997">Online</span></td>
            </tr>

            <tr>
              <td>Start time:</td>
              <td>{{ formatTime(parserData.start_time) }}</td>
              <td>{{ formatDate(parserData.start_time) }}</td>
            </tr>

            <tr>
              <td>Last check:</td>
              <td>{{ formatTime(parserData.last_check) }}</td>
              <td>{{ formatDate(parserData.last_check) }}</td>
            </tr>

            <tr>
              <td>Next check:</td>
              <td>{{ formatTime(parserData.next_check) }}</td>
              <td>{{ formatDate(parserData.next_check) }}</td>
            </tr>

            <tr>
              <td>Check period:</td>
              <td colspan="2">{{ parserData.check_period }} hours</td>

            </tr>

            <tr>
              <td>Parser threads:</td>
              <td colspan="2">{{ parserData.num_cpus }}</td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.red-border {
  --bs-card-border-color: #EF2D56FF;
}
</style>