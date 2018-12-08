<template lang="pug">
div
  h1 This route is visible by authenticated users only.
</template>

<script>
export default {
  middleware: 'auth',
};
</script>

<style lang="stylus">
</style>
