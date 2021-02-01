<template>
  <Layout>
    <router-view/>
  </Layout>
</template>

<script>
import Layout from '@/components/ui/layout';

export default {
  name: 'App',
  components: {
    Layout,
  },
};
</script>

<style lang="scss" module>
  @import './components/ui/color-palette';

  html,
  body,
  h1, h2, h3, h4, h5, h6 {
    padding: 0;
    margin: 0;
  }

  body {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $ui-color-black;
    background-color: $ui-color-white;
  }

  input {
    margin: 0;
    padding: 0;
    border: 1px solid $ui-color-gray-dark;
    border-radius: 4px;
    background-color: $ui-color-white;
  }

  button {
    padding: 0;
    margin: 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
  }

  a {
    text-decoration: none;
  }
</style>
