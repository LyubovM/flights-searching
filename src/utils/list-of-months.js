import moment from 'moment';

const listOfMonths = (date) => {
  const currentDate = moment();
  const dateEnd = moment(date);
  const months = [];
  while (dateEnd > currentDate || currentDate.format('M') === dateEnd.format('M')) {
    months.push(currentDate.format('YYYY-MM'));
    currentDate.add(1, 'month');
  }
  return months;
};

export default listOfMonths;
