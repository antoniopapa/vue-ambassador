<template>
  <div class="container">
    <header
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li>
          <router-link to="/" class="nav-link px-2 link-secondary" exact-active-class="link-dark">Frontend</router-link>
        </li>
        <li>
          <router-link to="/backend" class="nav-link px-2 link-secondary" active-class="link-dark">Backend</router-link>
        </li>
      </ul>


      <div class="col-md-3 text-end" v-if="user">
        <router-link to="/rankings" class="btn me-2">Rankings</router-link>
        <router-link to="/stats" class="btn me-2">Stats</router-link>
        <a href="#" class="btn btn-outline-primary me-2" @click="logout">Logout</a>
        <router-link to="/profile" class="btn btn-primary">{{ user.first_name }} {{ user.last_name }}</router-link>
      </div>

      <div class="col-md-3 text-end" v-if="!user">
        <router-link to="/login" class="btn btn-outline-primary me-2">Login</router-link>
        <router-link to="/register" class="btn btn-primary">Sign-up</router-link>
      </div>

    </header>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";
import axios from "axios";

export default {
  name: "Nav",
  setup() {
    const store = useStore();

    const user = computed(() => store.state.user);

    const logout = async () => {
      await axios.post('logout');
      await store.dispatch('setUser', null);
    }

    return {
      user,
      logout
    }
  }
}
</script>
