<template>
  <Nav/>

  <main>

    <Header v-if="showHeader"/>

    <div class="album py-5 bg-light">
      <div class="container">
        <router-view/>
      </div>
    </div>

  </main>
</template>

<script>
import Nav from "../components/Nav";
import Header from "../components/Header";
import {computed, onMounted} from "vue";
import axios from "axios";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

export default {
  name: "Layout",
  components: {Header, Nav},
  setup() {
    const store = useStore();
    const route = useRoute();
    const showHeader = computed(() => route.path === '/' || route.path === '/backend');

    onMounted(async () => {
      try {
        const {data} = await axios.get('user');

        await store.dispatch('setUser', data);
      } catch (e) {
        await store.dispatch('setUser', null);
      }
    });

    return {
      showHeader
    }
  }
}
</script>
