import listOfMonths from '@/utils/list-of-months';

describe('list of months', () => {
  it('list of months', () => {
    const date = ['2021-02-28', '2021-03-28', '2021-04-28'];
    const result = [['2021-02'], ['2021-02', '2021-03'], ['2021-02', '2021-03', '2021-04']];
    date.forEach((item, index) => {
      expect(listOfMonths(item)).toEqual(result[index]);
    });
  });
});
