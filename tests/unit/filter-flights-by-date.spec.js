import filterFlightsByDate from '@/utils/filter-flights-by-date';

describe('filter fligts by date', () => {
  const mockData = [{
    quotes: [{
      quoteId: 1,
      minPrice: 276,
      direct: false,
      outboundLeg: {
        carrierIds: [1324],
        originId: 82495,
        destinationId: 81727,
        departureDate: '2021-03-10T00:00:00',
      },
      quoteDateTime: '2021-01-31T17:47:00',
    }, {
      quoteId: 6,
      minPrice: 406,
      direct: false,
      outboundLeg: {
        carrierIds: [1717],
        originId: 82495,
        destinationId: 81727,
        departureDate: '2021-03-11T00:00:00',
      },
      quoteDateTime: '2021-01-31T17:46:00',
    }, {
      quoteId: 7,
      minPrice: 420,
      direct: false,
      outboundLeg: {
        carrierIds: [1755],
        originId: 88879,
        destinationId: 81727,
        departureDate: '2021-03-31T00:00:00',
      },
      quoteDateTime: '2021-01-29T02:56:00',
    }, {
      quoteId: 10,
      minPrice: 2168,
      direct: false,
      outboundLeg: {
        carrierIds: [1717],
        originId: 82495,
        destinationId: 81727,
        departureDate: '2021-03-23T00:00:00',
      },
      quoteDateTime: '2021-01-30T08:35:00',
    }],
  }];

  const mockDate = '2021-03-16';

  const result = [{
    quotes: [{
      quoteId: 1,
      minPrice: 276,
      direct: false,
      outboundLeg: {
        carrierIds: [1324],
        originId: 82495,
        destinationId: 81727,
        departureDate: '2021-03-10T00:00:00',
      },
      quoteDateTime: '2021-01-31T17:47:00',
    }, {
      quoteId: 6,
      minPrice: 406,
      direct: false,
      outboundLeg: {
        carrierIds: [1717],
        originId: 82495,
        destinationId: 81727,
        departureDate: '2021-03-11T00:00:00',
      },
      quoteDateTime: '2021-01-31T17:46:00',
    }],
  }];

  it('filter flights by date', () => {
    expect(filterFlightsByDate(mockData, mockDate)).toStrictEqual(result);
  });
});
