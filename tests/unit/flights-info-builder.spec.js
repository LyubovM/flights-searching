import moment from 'moment';
import { flightsBuilderFromArray, minPriceReducerFromArray } from '@/utils/flights-info-builder';

describe('flights info builder', () => {
  const mockData = [{
    quotes: [{
      quoteId: 16,
      minPrice: 409,
      direct: false,
      outboundLeg: {
        carrierIds: [1755],
        originId: 88879,
        destinationId: 81727,
        departureDate: '2021-02-03T00:00:00',
      },
      quoteDateTime: '2021-01-28T04:00:00',
    }, {
      quoteId: 18,
      minPrice: 420,
      direct: false,
      outboundLeg: {
        carrierIds: [1755],
        originId: 88879,
        destinationId: 81727,
        departureDate: '2021-02-02T00:00:00',
      },
      quoteDateTime: '2021-01-28T21:22:00',
    }],
    carriers: [{
      carrierId: 1324,
      name: 'KLM',
    }, {
      carrierId: 838,
      name: 'Air France',
    }, {
      carrierId: 1717,
      name: 'Aeroflot',
    }, {
      carrierId: 1755,
      name: 'Turkish Airlines',
    }],
    places: [{
      name: 'San Francisco International',
      type: 'Station',
      placeId: 81727,
      iataCode: 'SFO',
      skyscannerCode: 'SFO',
      cityname: 'San Francisco',
      cityId: 'SFOA',
      countryname: 'United States',
    }, {
      name: 'Moscow Sheremetyevo',
      type: 'Station',
      placeId: 82495,
      iataCode: 'SVO',
      skyscannerCode: 'SVO',
      cityname: 'Moscow',
      cityId: 'MOSC',
      countryname: 'Russia',
    }, {
      name: 'Moscow Vnukovo',
      type: 'Station',
      placeId: 88879,
      iataCode: 'VKO',
      skyscannerCode: 'VKO',
      cityname: 'Moscow',
      cityId: 'MOSC',
      countryname: 'Russia',
    }, {
      name: 'Moscow',
      type: 'City',
      placeId: 3280291,
      skyscannerCode: 'MOSC',
      cityId: 'MOSC',
      countryname: 'Russia',
    }],
    currencies: [{
      code: 'USD',
      symbol: '$',
      thousandsSeparator: ',',
      decimalSeparator: '.',
      symbolOnLeft: true,
      spaceBetweenAmountAndsymbol: false,
      roundingCoefficient: 0,
      decimalDigits: 2,
    }],
    routes: [{
      quoteDateTime: '2021-01-28T20:20:00',
      price: 275,
      originId: 3280291,
      destinationId: 81727,
      quoteIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    }],
  }];

  const result = [{
    isDirect: false,
    price: 409,
    currency: '$',
    carriersName: ['Turkish Airlines'],
    departureDate: moment('2021-02-03T00:00:00'),
    printDate: '03-02-2021, 00:00',
    originPlace: 'Moscow Vnukovo, VKO',
    destinationPlace: 'San Francisco International SFO',
  }, {
    isDirect: false,
    price: 420,
    currency: '$',
    carriersName: ['Turkish Airlines'],
    departureDate: moment('2021-02-02T00:00:00'),
    printDate: '02-02-2021, 00:00',
    originPlace: 'Moscow Vnukovo, VKO',
    destinationPlace: 'San Francisco International SFO',
  }];

  it('flights builder from array', () => {
    expect(flightsBuilderFromArray(mockData)).toStrictEqual(result);
  });

  it('min price reducer from array', () => {
    expect(minPriceReducerFromArray(result)).toBe(409);
  });
});
