<template>
  <form :class="$style.searchForm">
    <div
      v-for="(input, index) in inputs"
      :key="index"
      :class="$style.inputContainer"
    >
      <component
        :is="input.component"
        v-bind="{...input.props}"
        v-on="input.events"
      />
    </div>
    <Button
      :title="btnTitle"
      :disabled="isBtnDisabled"
      :class="$style.formBtn"
      @click="search"
    />
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Button from '@/components/ui/button';
import FormAutocomplete from '@/components/ui/form-autocomplete';
import Datepicker from '@/components/ui/datepicker';
import _debounce from 'lodash/debounce';

export default {
  name: 'SearchBox',
  components: {
    FormAutocomplete,
    Datepicker,
    Button,
  },
  data: () => ({
    btnTitle: 'Search now',
    list: '',
    formData: {
      departure: '',
      arrival: '',
      dateFrom: '',
      dateTo: '',
    },
    isLoading: false,
  }),
  computed: {
    ...mapState('places', ['placesList']),

    inputs() {
      return [{
        component: 'form-autocomplete',
        props: {
          placeholder: 'From',
          suggestions: this.placesList,
          isLoading: this.isLoading,
        },
        events: {
          input: this.handleInputData,
          change: this.handleChangeDeparture,
        },
      }, {
        component: 'form-autocomplete',
        props: {
          placeholder: 'To',
          suggestions: this.placesList,
          isLoading: this.isLoading,
        },
        events: {
          input: this.handleInputData,
          change: this.handleChangeArrival,
        },
      }, {
        component: 'datepicker',
        props: {
          placeholder: 'Date from',
        },
        events: {
          change: this.handleDateFrom,
        },
      }, {
        component: 'datepicker',
        props: {
          placeholder: 'Date to',
        },
        events: {
          change: this.handleDateTo,
        },
      }];
    },

    isDeparturePlaceValid() {
      return !!this.formData.departure;
    },

    isArrivalPlaceValid() {
      return !!this.formData.arrival;
    },

    isDateFromValid() {
      return !!this.formData.dateFrom;
    },

    isBtnDisabled() {
      return !(this.isDeparturePlaceValid && this.isArrivalPlaceValid && this.isDateFromValid);
    },
  },
  methods: {
    ...mapActions('places', ['fetchPlacesList']),

    search() {
      if (!this.isBtnDisabled) {
        this.$router.push({
          name: 'flights-listing',
          params: {
            originPlace: this.formData.departure,
            destinationPlace: this.formData.arrival,
            departureDate: this.formData.dateFrom,
            returnDate: this.formData.dateTo,
          },
        });
      }
    },

    handleChangeDeparture(id) {
      this.formData.departure = id;
    },

    handleChangeArrival(id) {
      this.formData.arrival = id;
    },

    handleDateFrom(date) {
      this.formData.dateFrom = date;
    },

    handleDateTo(date) {
      this.formData.dateTo = date;
    },

    handleInputData: _debounce(async function handleInputData(value) {
      if (value.length <= 1) {
        return;
      }
      this.isLoading = true;
      await this.fetchPlacesList(value);
      this.isLoading = false;
    }, 500),
  },
};
</script>

<style lang="scss" module>
  @import '../ui/screen-sizes';

  .searchForm {
    margin: -12px 0;
    display: flex;
    flex-wrap: wrap;
  }

  .inputContainer {
    margin-top: 12px;
    width: 100%;
    max-width: 600px;
  }

  .formBtn {
    margin: 20px auto;
    width: 100%;
  }

  input {
    width: 100%;
    padding: 4px 8px;
    box-sizing: border-box;
  }

  @media screen and (min-width: $s-screen-breakpoint--min){
    .inputContainer {
      width: calc(50% - 6px);
      &:nth-child(2n) {
        margin-left: 12px;
      }
    }
  }

  @media screen and (min-width: $m-screen-breakpoint--min){
    .inputContainer {
      width: calc(100% / 4 - 9px);
      margin-left: 12px;
      &:first-child {
        margin-left: 0;
      }
    }

    .formBtn {
      margin: 40px auto;
      width: 250px;
    }
  }
</style>
