<template lang="pug">
div
  a-layout
    app-main-navigation
    a-layout-content
      nuxt
    a-layout-footer
</template>

<script>
import AppMainNavigation from '~/components/AppMainNavigation';

export default {
  components: { AppMainNavigation },
};
</script>

<style>
</style>
