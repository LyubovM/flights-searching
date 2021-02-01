<template>
  <div :class="$style.container">
    <input
      v-model="value"
      :placeholder="placeholder"
      :class="$style.input"
      @keydown.enter='handleEnter'
      @keydown.down='handleDownKey'
      @keydown.up='handleUpKey'
      @keydown.tab="closeSuggestions"
      @input="handleInput(value)">
    <div
      v-if="showOnTyping"
      :class="$style.suggestionList"
    >
      <template v-if="suggestions.length">
        <div
          v-for="(item, index) in suggestions"
          v-click-outside="closeSuggestions"
          :key="item.id"
          :class="[$style.suggestionItem, {[$style.active]: isActive(index)} ]"
          @mouseover="setIndex(index)"
          @click="setInput(item)"
        >
          {{ item.name }}
        </div>
      </template>
      <template v-else><div :class="$style.suggestionItemError">No data was found</div></template>
    </div>
  </div>
</template>

<script>

const MIN_LENGTH = 2;

export default {
  name: 'FormAutocomplete',
  props: {
    suggestions: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    id: '',
    value: '',
    showOnTyping: false,
    forceClose: false,
    current: 0,
  }),
  watch: {
    value: {
      handler(val) {
        this.showOnTyping = val.length >= MIN_LENGTH;
      },
    },
    forceClose: {
      handler(val) {
        this.showOnTyping = !val;
      },
    },
  },
  methods: {
    handleEnter() {
      if (this.value.length) {
        const value = this.suggestions[this.current];
        this.setInput(value);
      }
    },
    handleUpKey() {
      if (this.current > 0) {
        this.current--;
      }
    },
    handleDownKey() {
      if (this.current < this.suggestions.length - 1) {
        this.current++;
      }
    },
    closeSuggestions() {
      this.forceClose = true;
    },
    isActive(index) {
      return index === this.current;
    },
    handleInput(value) {
      this.forceClose = false;
      this.$emit('input', value);
    },
    setIndex(index) {
      this.current = index;
    },
    setInput(value) {
      this.value = value.name;
      this.id = value.id;
      this.forceClose = true;
      this.$emit('change', this.id);
    },
  },
};
</script>

<style lang="scss" module>
  @import '../color-palette';

  .container {
    position: relative;
  }

  .input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid $ui-color-gray-dark;
    border-radius: 4px;
  }

  .suggestionList {
    padding: 4px 0;
    width: 100%;
    max-height: 280px;
    position: absolute;
    background-color: $ui-color-white;
    border: 1px solid $ui-color-gray-dark;
    border-radius: 4px;
    box-sizing: border-box;
    overflow: scroll;
    z-index: 50;
  }

  .suggestionItem {
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
    &:hover,
    &.active {
      background-color: $ui-color-gray;
    }
  }

  .suggestionItemError {
    padding: 8px 12px;
    font-size: 14px;
  }
</style>
