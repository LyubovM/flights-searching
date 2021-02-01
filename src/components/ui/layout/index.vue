<template>
  <div>
    <Header />
    <div :class="[$style.container, {[$style.centered]: hasCenteredClass}]">
      <slot />
    </div>
  </div>
</template>

<script>
import Header from '../header';

export default {
  name: 'Layout',
  components: {
    Header,
  },
  computed: {
    hasCenteredClass() {
      return this.$route.name !== 'main';
    },
  },
};
</script>

<style lang="scss" module>
  @import '../screen-sizes';

  .container {
    padding: 12px;
  }

  .centered {
    margin: 0 auto;
    min-width: 280px;
    max-width: 1200px;
  }

  @media screen and (min-width: $s-screen-breakpoint--min){
    .container {
      padding: 24px;
    }
  }
</style>
