<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left">#</th>
        <th class="text-left">Code</th>
        <th class="text-left">Count</th>
        <th class="text-left">Revenue</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="link in links" :key="link.id">
        <td>{{ link.id }}</td>
        <td>{{ link.code }}</td>
        <td>{{ link.orders.length }}</td>
        <td>{{ link.orders.reduce((s, o) => s + o.total, 0) }}</td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import axios from "axios";

export default {
  name: "Links",
  data() {
    return {
      links: []
    }
  },
  async mounted() {
    const {data} = await axios.get(`users/${this.$route.params.id}/links`);

    this.links = data;
  }
}
</script>
