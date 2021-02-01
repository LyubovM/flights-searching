<template>
  <div>
    <template v-if="isLoading">
      Wait a second...
    </template>
    <div v-else>
      <router-link
        :to="{name: 'main'}"
        :class="$style.link"
      >Choose another flight?</router-link>
      <template v-if="getFlights.length">
        <div :class="$style.container">
          <div :class="$style.filtersContainer">
            <sortings
              :flights="flightsArray"
              @sort="handleSort"/>
            <filters
              @change="handleDirectChecked"
              @range="handleRange"
            />
          </div>
          <div
            v-if="flightsArray.length"
            :class="$style.flightsList"
          >
            <flight-info
              v-for="(flight, index) in flightsArray"
              :key="index"
              :flight="flight"
              :class="$style.flightInfo"
              @click="handlePrice"
            />
          </div>
          <template v-else>
            <div>Sorry, we can't find any flights</div>
          </template>
        </div>
        <total-price
          v-if="tripPrice"
          :price="tripPrice"
          :currency="currency"
        />
      </template>
      <template v-else>
        <div>Sorry, we can't find any flights</div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import FlightInfo from '@/components/flight-info';
import TotalPrice from '@/components/total-price';
import Sortings from '@/components/sortings';
import Filters from '@/components/filters';
import moment from 'moment';

export default {
  name: 'FlightsListing',
  props: {
    originPlace: {
      type: String,
      default: '',
    },
    destinationPlace: {
      type: String,
      default: '',
    },
    departureDate: {
      type: String,
      default: '',
    },
    returnDate: {
      type: String,
      default: '',
    },
  },
  components: {
    FlightInfo,
    TotalPrice,
    Sortings,
    Filters,
  },
  data: () => ({
    isLoading: false,
    tripPrice: 0,
    flightsArray: [],
    isCheckedDirect: false,
    sortedArray: [],
    minPriceFilter: 0,
    maxPriceFilter: 0,
  }),
  computed: {
    ...mapGetters('flights', ['getFlights']),
    currency() {
      return this.getFlights[0].currency;
    },
  },
  async created() {
    this.isLoading = true;
    const data = this.returnDate
      ? {
        originPlace: this.originPlace,
        destinationPlace: this.destinationPlace,
        departureDate: this.departureDate,
        returnDate: this.returnDate,
      }
      : {
        originPlace: this.originPlace,
        destinationPlace: this.destinationPlace,
        departureDate: this.departureDate,
      };
    await this.fetchFlightsList(data);
    this.isLoading = false;
    this.flightsArray = this.getFlights;
  },
  watch: {
    sortedArray(val) {
      this.flightsArray = this.flightsArray !== val ? val : this.flightsArray;
    },
    isCheckedDirect(val) {
      this.flightsArray = this.getFlights.filter(item => item.isDirect === val);
    },
    minPriceFilter(val) {
      this.flightsArray = this.getFlights.filter(item => val <= item.price && item.price <= this.maxPriceFilter);
    },
    maxPriceFilter(val) {
      this.flightsArray = this.getFlights.filter(item => item.price <= val && item.price >= this.minPriceFilter);
    },
  },
  methods: {
    ...mapActions('flights', ['fetchFlightsList']),

    handlePrice({ price, isActive }) {
      this.tripPrice = isActive ? this.tripPrice + price : this.tripPrice - price;
    },

    handleSort(array) {
      this.sortedArray = array;
    },

    handleDirectChecked(val) {
      this.isCheckedDirect = val;
    },

    handleRange({ min, max }) {
      this.minPriceFilter = min;
      this.maxPriceFilter = max;
    },
  },
};
</script>

<style lang="scss" module>
  @import '@/components/ui/color-palette';
  @import '@/components/ui/screen-sizes';

  .container {
    display: flex;
    flex-direction: column;
    padding-bottom: 40px;
  }

  .filtersContainer {
    margin-bottom: 14px;
    display: flex;
    flex-direction: column;
  }

  .link {
    display: inline-block;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 600;
    color: $ui-color-blue;
  }

  .flightInfo {
    margin-bottom: 12px;
    cursor: pointer;
    &:last-child {
      margin-bottom: 0;
    }
  }

  @media screen and (min-width: $m-screen-breakpoint--min){
    .container {
      flex-direction: row;
    }

    .filtersContainer {
      margin-right: 50px;
      width: 250px;
      height: max-content;
      position: sticky;
      top: 30px;
    }

    .flightsList {
      width: calc(100% - 250px - 50px); /* 100% - filter container width - margin*/
    }

    .link {
      margin-bottom: 20px;
      font-size: 16px;
    }
  }
</style>
