import moment from 'moment';

export const flightsBuilderFromObject = (item) => {
  const { carriers, currencies, places, quotes } = item;
  return quotes.map(flight => {
    const carriersName = carriers.filter(carrier => flight.outboundLeg.carrierIds
      .find(id => id === carrier.carrierId)).map(carrier => carrier.name);
    const originPlace = places.find(({ placeId }) => placeId === flight.outboundLeg.originId).name;
    const originIataCode = places.find(({ placeId }) => placeId === flight.outboundLeg.originId).iataCode;
    const destinationPlace = places.find(({ placeId }) => placeId === flight.outboundLeg.destinationId).name;
    const destinationIataCode = places.find(({ placeId }) => placeId === flight.outboundLeg.destinationId).iataCode;
    return {
      isDirect: flight.direct,
      price: flight.minPrice,
      currency: currencies[0].symbol,
      carriersName,
      departureDate: moment(flight.outboundLeg.departureDate),
      printDate: moment(flight.outboundLeg.departureDate).format('DD-MM-YYYY, HH:mm'),
      originPlace: `${originPlace}, ${originIataCode}`,
      destinationPlace: `${destinationPlace} ${destinationIataCode}`,
    };
  });
};

export const flightsBuilderFromArray = (list) => list.flatMap(item => flightsBuilderFromObject(item));

export const minPriceReducerFromArray = (list) => list.reduce((acc, item, index) => {
  const min = item.price;
  if (index === 0) {
    // eslint-disable-next-line no-param-reassign
    acc = item.price;
  }
  // eslint-disable-next-line no-param-reassign
  acc = acc > min ? min : acc;
  return acc;
}, 0);
