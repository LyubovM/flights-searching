import moment from 'moment';

const today = moment().format('YYYY-MM-DDTHH:mm');

const filterFlightsByDate = (list, dateEnd) => list.flatMap(item => {
  const dateEndFormated = moment(dateEnd).add(1, 'day').format('YYYY-MM-DDTHH:mm');
  const filteredQuotes = item.quotes.filter(quote => moment(quote.outboundLeg.departureDate).isBetween(today, dateEndFormated));
  return {
    ...item,
    quotes: filteredQuotes,
  };
});

export default filterFlightsByDate;
