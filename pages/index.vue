<template lang="pug">
app-container
  h1  This is a public route
</template>

<script>
import AppContainer from '~/components/AppContainer';
import Firebase from '~/plugins/firebase';
import api from '~/api';

export default {
  components: { AppContainer },
  async fetch() {
    const list = await api.posts.getAll();
  },
  methods: {
    async refresh() {
      const res = await api.posts.getAll();
    },
  },
};
</script>

<style>
</style>
