<template>
  <div>
    <div :class="$style.label">Cost range:</div>
    <div :class="$style.rangeContainer">
      <div :class="$style.price">{{ minPrice }}</div>
      <div :class="$style.price">{{ maxPrice }}</div>
    </div>
    <div :class="$style.wrapper">
      <input
        v-model.number="minPrice"
        :class="$style.range"
        :min="getMinPrice"
        :max="getMaxPrice"
        :step="step"
        type="range"
        @change="setRangeSlider"
      >
      <input
        v-model.number="maxPrice"
        :class="$style.range"
        :min="getMinPrice"
        :max="getMaxPrice"
        :step="step"
        type="range"
        @change="setRangeSlider"
      >
      <div :style="getProgressStyle" :class="$style.sliderProgress" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CostRange',
  data: () => ({
    minPrice: 0,
    maxPrice: 0,
    step: 1,
  }),
  computed: {
    ...mapGetters('flights', ['getMaxPrice', 'getMinPrice']),

    getProgressStyle() {
      const minValue = this.getMinPrice;
      const maxValue = this.getMaxPrice;
      const currentMin = this.minPrice;
      const currentMax = this.maxPrice;
      const low = Math.round(100 * ((currentMin - minValue) / (maxValue - minValue))) - 0.5;
      const high = Math.round(100 * ((currentMax - minValue) / (maxValue - minValue))) + 0.5;

      return {
        '--low': `${low}%`,
        '--high': `${high}%`,
      };
    },
  },
  watch: {
    minPrice() {
      this.getProgressStyle;
    },
    maxPrice() {
      this.getProgressStyle;
    },
  },
  created() {
    this.minPrice = this.getMinPrice;
    this.maxPrice = this.getMaxPrice;
  },
  methods: {
    setRangeSlider() {
      if (this.minPrice > this.maxPrice) {
        const minValue = this.maxPrice;
        this.maxPrice = this.minPrice;
        this.minPrice = minValue;
      }
      this.$emit('change', { min: this.minPrice, max: this.maxPrice });
    },
  },
};
</script>

<style lang="scss" module>
  @import '../ui/color-palette';

  .rangeContainer {
    display: flex;
    justify-content: space-between;
  }

  .price {
    margin-top: 4px;
    font-weight: 500;
  }

  .wrapper {
    margin-top: 4px;
    height: 26px;
    position: relative;
  }

  .range {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 0;
    position: absolute;
    left: 0;
    cursor: pointer;
    outline: none;
    border: 0;
    pointer-events: none;
    background: transparent;
    -webkit-appearance: none;
    -moz-appearance: none;
    z-index: 10;
    &::-webkit-slider-runnable-track {
      height: 1px;
      outline: 0;
      -webkit-appearance: none;
    }
    &::-moz-range-track {
      height: 1px;
      outline: 0;
      -moz-appearance: none;
    }
    &::-webkit-slider-thumb {
      margin-top: -7px;
      position: relative;
      top: 0;
      pointer-events: all;
      z-index: 10;
    }
    &::-moz-range-thumb {
      margin-top: -7px;
      position: relative;
      top: 0;
      pointer-events: all;
      z-index: 10;
    }
  }

  .sliderProgress {
    height: 8px;
    width: 100%;
    position: absolute;
    left: 0;
    top: -3px;
    $track-background: linear-gradient(to right, $ui-color-gray var(--low), $ui-color-yellow-dark 0, $ui-color-yellow-dark var(--high), $ui-color-gray 0) no-repeat 0 100% / 100% 100%;
    background: $track-background;
  }
</style>
