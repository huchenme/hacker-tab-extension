import startRequest from '../startRequest';
import { getObject, setObject } from '../../helpers/localStorage';
import { fetchRepositories } from '../../helpers/github';
import { when } from 'jest-when';

jest.mock('../../helpers/localStorage');
jest.mock('../../helpers/github');

const RealDate = Date;

function mockDate(isoDate) {
  global.Date = class extends RealDate {
    constructor() {
      return new RealDate(isoDate);
    }
  };
}

beforeEach(() => {
  mockDate('2020-03-11T12:00:00z');
  fetchRepositories.mockClear();
  jest.spyOn(console, 'error');
  jest.spyOn(console, 'log');
  console.error.mockImplementation(() => {});
  console.log.mockImplementation(() => {});
});

afterEach(() => {
  global.Date = RealDate;
  console.error.mockRestore();
  console.log.mockRestore();
});

test.each`
  selectedPeriod | selectedLanguage | selectedSpokenLanguage | expectedPeriod | expectedLanguage | expectedSpokenLanguage
  ${'weekly'}    | ${'javascript'}  | ${'en'}                | ${'weekly'}    | ${'javascript'}  | ${'en'}
  ${undefined}   | ${undefined}     | ${undefined}           | ${undefined}   | ${undefined}     | ${undefined}
  ${'weekly'}    | ${'__ALL__'}     | ${'__ALL__'}           | ${'weekly'}    | ${undefined}     | ${undefined}
`(
  'send correct param to request',
  ({
    selectedPeriod,
    selectedLanguage,
    selectedSpokenLanguage,
    expectedPeriod,
    expectedLanguage,
    expectedSpokenLanguage,
  }) => {
    when(getObject)
      .calledWith('selectedPeriod')
      .mockReturnValue(selectedPeriod)
      .calledWith('selectedLanguage')
      .mockReturnValue(selectedLanguage)
      .calledWith('selectedSpokenLanguage')
      .mockReturnValue(selectedSpokenLanguage);
    startRequest();
    expect(fetchRepositories).toHaveBeenCalledTimes(1);
    expect(fetchRepositories).toHaveBeenCalledWith({
      language: expectedLanguage,
      since: expectedPeriod,
      spoken_language_code: expectedSpokenLanguage,
    });
  }
);

test('not update localStorage if request fail', async () => {
  fetchRepositories.mockRejectedValue(new Error('error'));
  await startRequest();
  expect(setObject).toHaveBeenCalledTimes(0);
});

test('not update localStorage if response is empty', async () => {
  fetchRepositories.mockResolvedValue([]);
  await startRequest();
  expect(setObject).toHaveBeenCalledTimes(0);
});

test('update localStorage if response is not empty', async () => {
  fetchRepositories.mockResolvedValue([
    { id: 1, name: 'a' },
    { id: 2, name: 'b' },
  ]);
  await startRequest();
  expect(setObject).toHaveBeenCalledTimes(2);
  expect(setObject).toHaveBeenCalledWith('repositories', [
    { id: 1, name: 'a' },
    { id: 2, name: 'b' },
  ]);
  expect(setObject).toHaveBeenCalledWith(
    'lastUpdatedTime',
    new Date().getTime()
  );
});
