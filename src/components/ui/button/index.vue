<template>
  <button
    :class="[$style.btn, {[$style.disabled]: disabled}]"
    :disabled="disabled"
    type="button"
    @click="handleClick"
  >
    {{ title }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    title: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick($event) {
      if (!this.disable && this.$listeners.click) {
        this.$listeners.click($event);
      }
    },
  },
};
</script>

<style lang="scss" module>
  @import '../color-palette';
  @import '../screen-sizes';

  .btn {
    padding: 8px 12px;
    font-size: 16px;
    color: $ui-color-white;
    background-color: $ui-color-yellow-dark;
  }

  .disabled {
    background-color: $ui-color-gray;
    cursor: default;
  }

  @media screen and (min-width: $m-screen-breakpoint--min){
    .btn {
      padding: 12px 24px;
    }
  }
</style>
