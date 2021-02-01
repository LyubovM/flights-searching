<template>
  <div :class="$style.container">
    <div :class="$style.title">Sort:</div>
    <custom-sort
      v-for="(item, index) in sortList"
      :key="index"
      :target-array="flights"
      :sort-param="item.sortParam"
      :class="{ [$style.activeSortItem]: activeParam === item.sortParam}"
      @sort="sort">
      <div>{{ item.title }}</div>
    </custom-sort>
  </div>
</template>

<script>
import CustomSort from './custom-sort';

export default {
  name: 'Sortings',
  components: {
    CustomSort,
  },
  props: {
    flights: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    activeParam: '',
  }),
  computed: {
    sortList() {
      return [{
        title: 'by price',
        sortParam: 'price',
      }, {
        title: 'by date',
        sortParam: 'departureDate',
      }];
    },
  },
  methods: {
    sort({ array, activeParam }) {
      this.activeParam = activeParam;
      this.$emit('sort', array);
    },
  },
};
</script>

<style lang="scss" module>
  @import '../ui/color-palette';

  .container {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }

  .title {
    margin-right: 20px;
    font-size: 16px;
  }

  .activeSortItem {
    font-weight: 600;
  }
</style>
