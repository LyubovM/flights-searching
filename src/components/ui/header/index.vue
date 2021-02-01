<template>
  <div :class="[$style.header, {[$style.colored]: !isMainPage}]">
    <div :class="$style.container">
      <router-link
        :to="{name: 'main'}"
        :class="$style.title">
        Flights searching
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    isMainPage() {
      return this.$route.name === 'main';
    },
  },
};
</script>

<style lang="scss" module>
  @import '../color-palette';
  @import '../screen-sizes';

  .header {
    &.colored {
      background-color: $ui-color-yellow-dark;
      .title {
        color: $ui-color-white;
      }
    }
  }

  .container {
    margin: 0 auto;
    padding: 8px 12px;
    min-width: 280px;
    max-width: 1200px;
  }

  .title {
    font-size: 16px;
    color: $ui-color-yellow-dark;
  }

  @media screen and (min-width: $s-screen-breakpoint--min){
    .container {
      padding: 12px 24px;
    }

    .title {
      font-size: 18px;
    }
  }

  @media screen and (min-width: $l-screen-breakpoint--min) {
    .title {
      font-size: 20px;
    }
  }
</style>
