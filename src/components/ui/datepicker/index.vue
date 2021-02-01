<template>
  <div
    :class="$style.container"
    @blur="hideCalendar"
  >
    <input
      v-model="formattedDate"
      :placeholder="placeholder"
      :class="$style.input"
      readonly
      type="text"
      @click="showCalendar">
    <v-date-picker
      v-if="isVisible"
      v-model="date"
      v-click-outside="hideCalendar"
      :color="colors.yellowdark"
      :min="today"
      no-title
      show-current
      @change="handleChangeDate"
    />
  </div>
</template>

<script>
import moment from 'moment';
import colors from '../color-palette.scss?module';

export default {
  name: 'Datepicker',
  props: {
    placeholder: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    date: '',
    isVisible: false,
    colors,
  }),
  computed: {
    formattedDate() {
      return this.date ? moment(this.date).format('DD.MM.YYYY') : '';
    },
    today() {
      return moment().format('YYYY-MM-DD');
    },
  },
  methods: {
    showCalendar() {
      this.isVisible = true;
    },
    handleChangeDate() {
      this.$emit('change', this.date);
      this.hideCalendar();
    },

    hideCalendar() {
      this.isVisible = false;
    },
  },
};
</script>

<style lang="scss" module>
  @import '../screen-sizes';

  .container {
    position: relative;
  }

  .input {
    width: 100%;
    padding: 8px 12px;
  }
</style>

<style lang="scss" scoped>

  /*for re-writing vuetify styles*/

  @import '../color-palette';
  @import '../screen-sizes';

  .v-card {
    border: 1px solid $ui-color-gray-dark;
    z-index: 50;
  }

  @media screen  and (min-width: $s-screen-breakpoint--min){
    .v-card {
      position: absolute;
      top: 40px;
      left: 0;
    }
  }
</style>
