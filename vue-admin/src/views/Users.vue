<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Name</th>
          <th class="text-left">Email</th>
          <th class="text-left">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users.slice((page - 1) * perPage, page*perPage)" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.first_name }} {{ user.last_name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <v-btn :href="`/users/${user.id}/links`" color="primary" elevation="2">View</v-btn>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>

    <div class="text-center">
      <v-pagination
          v-model="page"
          total-visible="7"
          :length="lastPage"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Users",
  data() {
    return {
      users: [],
      page: 1,
      perPage: 10,
      lastPage: 0
    }
  },
  async mounted() {
    const {data} = await axios.get('ambassadors');

    this.users = data;
    this.lastPage = Math.ceil(data.length / this.perPage);
  }
}
</script>
