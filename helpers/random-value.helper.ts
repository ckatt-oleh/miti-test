import { range, reduce } from 'lodash/fp';

export const randomAlphabetString = (stringLength: number) => {
  return randomValue(
    stringLength,
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  );
};

export const randomValue = (strLength: number, str = '0123456789') => {
  const strLen = str.length;

  return reduce(
    (acc: string) => `${acc}${str[Math.floor(Math.random() * strLen)]}`,
    '',
    range(0, strLength),
  );
};
