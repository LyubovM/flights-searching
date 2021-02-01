<template>
  <div :class="$style.container">
    <div :class="$style.title">Total: <div :class="$style.price">{{ this.price }} {{ this.currency }}</div></div>
  </div>
</template>

<script>
export default {
  name: 'TotalPrice',
  props: {
    price: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" module>
  @import '../ui/color-palette';
  @import '../ui/screen-sizes';

  .container {
    padding: 12px 24px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: $ui-color-white;
    box-shadow: 0 -21px 10px -8px rgba(146, 146, 146, 0.42);
    z-index: 50;
  }

  .title {
    display: flex;
    align-items: flex-end;
    font-size: 14px;
  }

  .price {
    margin-left: 10px;
    font-weight: 600;
  }

  @media screen and (min-width: $m-screen-breakpoint--min){
    .container {
      padding: 20px 24px;
    }

    .title {
      font-size: 18px;
    }
  }
</style>
