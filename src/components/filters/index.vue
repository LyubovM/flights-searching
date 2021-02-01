<template>
  <div>
    <directs-flights @change="handleChangeDirect"/>
    <cost-range @change="handleChangeRange"/>
  </div>
</template>

<script>
import DirectsFlights from './directs-flights';
import CostRange from './cost-range';

export default {
  name: 'Filters',
  components: {
    DirectsFlights,
    CostRange,
  },
  methods: {
    handleChangeDirect(checked) {
      this.$emit('change', checked);
    },
    handleChangeRange({ min, max }) {
      this.$emit('range', { min, max });
    },
  },
};
</script>
