<template lang="pug">
div(:class="`app-container app-container--${size} ${paddingClass}`")
  slot
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'medium',
    },
    noPadding: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    paddingClass() {
      return this.noPadding ? 'app-container--no-padding' : '';
    },
  },
};
</script>

<style lang="stylus">
.app-container
  padding: 2.5em 20px
  display: block
  margin: 0 auto;

.app-container--medium
  max-width: 1120px

.app-container--no-padding
  padding: 0!important
</style>
