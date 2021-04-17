<template>
  <div class="container">
    <main>
      <div class="py-5 text-center">
        <h2>Success</h2>
        <p class="lead">Your purchase has been completed!</p>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "Success",
  async mounted() {
    const {data} = await this.$axios.post('orders/confirm', {
      source: this.$route.query.source
    });

    console.log(data);
  }
}
</script>
