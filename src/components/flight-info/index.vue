<template>
  <div
    :class="[$style.container, { [$style.cheapest]: isCheapest, [$style.active]: isActive }]"
    @click="handleFlightPrice"
  >
    <div
      v-if="isCheapest"
      :class="$style.attention"
    >Lowest Price</div>
    <div :class="$style.noticeRow">
      <div :class="$style.notice">{{ flight.printDate }}</div>
      <div :class="$style.notice">{{ isDirect }}</div>
    </div>
    <div :class="$style.row">
      <div :class="$style.place">{{ flight.originPlace }}</div>
      <div :class="$style.separator" />
      <div :class="$style.place">{{ flight.destinationPlace }}</div>
    </div>
    <div :class="$style.info">
      <div :class="$style.price">{{ flight.price }}{{ flight.currency }}</div>
      <span
        v-for="(carrier, index) in flight.carriersName"
        :key="index"
        :class="$style.carrierName">{{ carrier }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'FlightInfo',
  props: {
    flight: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    isActive: false,
  }),
  computed: {
    ...mapGetters('flights', ['getMinPrice']),

    isDirect() {
      return this.flight.isDirect ? 'direct flight' : 'flight with transition';
    },
    isCheapest() {
      return this.flight.price <= this.getMinPrice;
    },
  },
  methods: {
    handleFlightPrice() {
      this.isActive = !this.isActive;
      this.$emit('click', { price: this.flight.price, isActive: this.isActive });
    },
  },
};
</script>

<style lang="scss" module>
  @import '../ui/color-palette';
  @import '../ui/screen-sizes';

  .container {
    padding: 4px 8px;
    border: 1px solid $ui-color-gray-dark;
    border-radius: 4px;
    &.cheapest {
      border-color: $ui-color-red;
    }
    &.active {
      border-color: $ui-color-blue;
      background-color: $ui-color-blue-bg;
    }
  }

  .noticeRow {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .notice {
    font-size: 12px;
    font-weight: 600;
    color: $ui-color-gray-dark;
  }

  .row {
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .place {
    margin-top: 6px;
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    font-weight: 500;
    &:before {
      content: 'to:';
      padding-right: 4px;
      color: $ui-color-gray-dark;
    }
    &:first-child {
      margin-top: 0;
      &:before {
        content: 'from:';
      }
    }
  }

  .separator {
    margin: 0 10px;
    display: none;
    height: 2px;
    background-color: $ui-color-yellow-dark;
  }

  .info {
    margin-top: 8px;
    border-top: 1px solid $ui-color-yellow;
    text-align: center;
  }

  .price {
    margin-top: 8px;
    font-size: 16px;
    font-weight: 700;
  }
  .carrierName {
    font-size: 12px;
    &:after {
      content: ', ';
    }
    &:last-child {
      &:after {
        content: none;
      }
    }
  }

  .attention {
    margin-bottom: 8px;
    font-size: 14px;
    text-align: center;
    font-weight: 600;
    color: $ui-color-red;
  }

  @media screen and (min-width: $m-screen-breakpoint--min){
    .container {
      padding: 12px 24px;
    }

    .notice,
    .carrierName {
      font-size: 14px;
    }

    .attention {
      font-size: 18px;
    }

    .row {
      margin-top: 15px;
      flex-direction: row;
    }

    .info {
      margin-top: 15px;
    }

    .place {
      margin-top: 0;
      font-size: 16px;
      -webkit-line-clamp: 2;
      &:before {
        content: none;
      }
      &:first-child {
        text-align: right;
        &:before {
          content: none;
        }
      }
    }

    .separator {
      display: block;
      width: 50px;
    }

    .price {
      margin-top: 15px;
      font-size: 20px;
    }
  }
</style>
