<template lang="pug">
a-layout-header(style="background: #fff; padding: 4; height: auto;")
  app-container(noPadding)
    a-menu(mode="horizontal" style="border-bottom: none")
      a-row
        a-col(:span=12)
          a-avatar(style="backgroundColor:#87d068")
            a-icon(type="android")
          span(style="margin-left: 10px;") --your_app_name--
        a-col(:span=12)
          a-menu-item(style="float: right" v-if="!isAuthenticated")
            a-button(
              style="margin-right: 10px;"
              @click="$router.push(localePath('signin'))") {{ $t('mainNav.signIn') }}
            a-button(
            type="primary"
            @click="$router.push(localePath('signup'))") {{ $t('mainNav.signUp') }}
          a-menu-item(style="float: right" v-if="isAuthenticated")
            a-button(style="margin-right: 10px;" @click="$router.push(localePath('logout'))") {{ $t('mainNav.logout') }}
</template>

<script>
import { mapGetters } from 'vuex';
import AppContainer from '~/components/AppContainer';

export default {
  components: { AppContainer },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
    }),
  },
};
</script>

<style lang="stylus">
</style>
