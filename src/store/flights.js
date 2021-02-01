import api from '@/api';
import listOfMonths from '@/utils/list-of-months';
import { flightsBuilderFromArray, minPriceReducerFromArray, flightsBuilderFromObject } from '@/utils/flights-info-builder';
import filterFlightsByDate from '@/utils/filter-flights-by-date';

export default {
  namespaced: true,
  state: {
    flightsList: [],
  },
  getters: {
    getFlights: state => state.flightsList.flights,
    getMinPrice: state => state.flightsList.minPrice,
    getMaxPrice(state) {
      const prices = state.flightsList.flights.map(item => item.price);
      return Math.max.apply(null, prices);
    },
  },
  mutations: {
    SET_FLIGHTS(state, flights) {
      state.flightsList = flights;
    },
  },
  actions: {
    async fetchFlightsList({ commit, dispatch }, {
      originPlace,
      destinationPlace,
      departureDate,
      returnDate = '',
    }) {
      try {
        let returnsFlight;
        const months = listOfMonths(departureDate);
        const arrayPromises = months.map(async (month) => {
          const promise = await api.get(`browseroutes/v1.0/US/USD/en-US/${originPlace}/${destinationPlace}/${month}`);
          return promise;
        });
        const result = await Promise.all(arrayPromises);
        if (returnDate) {
          returnsFlight = await dispatch('fetchReturnsFlights', { originPlace, destinationPlace, returnDate });
        }
        const filteredArray = filterFlightsByDate(result, departureDate);
        const flights = flightsBuilderFromArray(filteredArray);
        if (returnsFlight) {
          flights.push(...returnsFlight);
        }
        const minPriceOutbound = minPriceReducerFromArray(flights);
        const minPriceInbound = returnDate ? minPriceReducerFromArray(returnsFlight) : null;
        const minPrice = minPriceInbound && minPriceOutbound > minPriceInbound ? minPriceInbound : minPriceOutbound;
        commit('SET_FLIGHTS', {
          flights,
          minPrice: returnDate ? minPrice : minPriceOutbound,
        });
      } catch (error) {
        console.log(error);
      }
    },

    async fetchReturnsFlights(_, { originPlace, destinationPlace, returnDate }) {
      const result = await api.get(`browseroutes/v1.0/US/USD/en-US/${destinationPlace}/${originPlace}/${returnDate}`);
      return flightsBuilderFromObject(result);
    },
  },
};
