import api from '@/api';

export default {
  namespaced: true,
  state: {
    placesList: [],
  },
  mutations: {
    SET_PLACES(state, places) {
      state.placesList = places;
    },
  },
  actions: {
    async fetchPlacesList({ commit }, query) {
      try {
        const { places } = await api.get('autosuggest/v1.0/UK/GBP/en-GB/', {
          params: {
            query,
          },
        });
        const filtered = places.map((item) => ({
          id: item.placeId,
          name: item.placeName,
        }));
        commit('SET_PLACES', filtered);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
