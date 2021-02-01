<template>
  <v-checkbox
    v-model="isChecked"
    :label="label"
    :color="colors.black"
    dense
    @change="handleChange"
  />
</template>

<script>
import colors from '../ui/color-palette.scss?module';

export default {
  name: 'DirectsFlights',
  data: () => ({
    isChecked: false,
    label: 'Only direct flights',
    colors,
  }),
  methods: {
    handleChange() {
      this.$emit('change', this.isChecked);
    },
  },
};
</script>

<style lang="scss" scoped>
  /*re-write vuetify styles*/
  :root {
    .v-input--selection-controls {
      margin-top: 6px;
      padding-top: 0;
    }
  }
</style>
