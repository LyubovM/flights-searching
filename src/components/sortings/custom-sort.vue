<template>
  <div
    :class="$style.sortName"
    @click="sortArray"
  >
    <slot />
    <v-icon
      :class="{ [$style.iconDesc]: isDesc }"
      small
    >mdi-arrow-up</v-icon>
  </div>
</template>

<script>

const DIRECTION = {
  ASC: 'asc',
  DESC: 'desc',
};

export default {
  name: 'CustomSort',
  props: {
    targetArray: {
      type: Array,
      default: () => [],
    },
    sortParam: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    direction: DIRECTION.ASC,
    activeSort: '',
  }),
  computed: {
    isDesc() {
      return this.direction === DIRECTION.DESC;
    },
    isActive() {
      return this.activeSort === this.sortParam;
    },
  },
  methods: {
    sortArray() {
      this.direction = this.direction === DIRECTION.ASC ? DIRECTION.DESC : DIRECTION.ASC;
      if (this.direction === DIRECTION.ASC) {
        this.targetArray.sort((a, b) => a[this.sortParam] - b[this.sortParam]);
      } else {
        this.targetArray.sort((a, b) => b[this.sortParam] - a[this.sortParam]);
      }
      this.$emit('sort', { array: this.targetArray, activeParam: this.sortParam });
    },
  },
};
</script>

<style lang="scss" module>

  .sortName {
    margin-right: 10px;
    display: flex;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
    &:last-child {
      margin-right: 0;
    }
  }

  .iconDesc {
    transform: rotate(180deg);
  }
</style>
