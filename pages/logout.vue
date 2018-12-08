<template lang="pug">
div
  h1 Logout.............
</template>

<script>
export default {
  async mounted(app) {
    await this.$store.dispatch('auth/logout');
    this.$router.push(this.localePath('index'));
  },
};
</script>

<style lang="css">
</style>
