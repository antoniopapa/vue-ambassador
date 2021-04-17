<template>
  <Products :products="filteredProducts" :filters="filters" @set-filters="filtersChanged" :lastPage="lastPage"/>
</template>

<script lang="ts">
import Products from "@/views/Products";
import {onMounted, reactive, ref} from "vue";
import {Product} from "@/models/product";
import axios from "axios";
import {Filter} from "@/models/filter";

export default {
  name: "ProductsFrontend",
  components: {Products},
  setup() {
    const allProducts = ref<Product[]>([]);
    const filteredProducts = ref<Product[]>([]);
    const filters = reactive<Filter>({
      s: '',
      sort: '',
      page: 1
    });
    const lastPage = ref(0);
    const perPage = 9;

    onMounted(async () => {
      const {data} = await axios.get('products/frontend');

      allProducts.value = data;
      filteredProducts.value = data.slice(0, filters.page * perPage);
      lastPage.value = Math.ceil(data.length / perPage);
    });

    const filtersChanged = (f: Filter) => {
      filters.s = f.s;
      filters.sort = f.sort;
      filters.page = f.page;

      let products = allProducts.value.filter(p => p.title.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0 ||
          p.description.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0);

      if (filters.sort === 'asc' || filters.sort === 'desc') {
        products.sort((a, b) => {
          const diff = a.price - b.price;

          if (diff === 0) return 0;

          const sign = Math.abs(diff) / diff;

          return filters.sort === 'asc' ? sign : -sign;
        })
      }

      lastPage.value = Math.ceil(products.length / perPage);
      filteredProducts.value = products.slice(0, filters.page * perPage);
    }

    return {
      filteredProducts,
      filters,
      lastPage,
      filtersChanged
    }
  }
}
</script>
