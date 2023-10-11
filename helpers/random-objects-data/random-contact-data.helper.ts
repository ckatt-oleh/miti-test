import { randomAlphabetString } from '../random-value.helper';

export const randomContacttData = () => {
  return {
    firstName: randomAlphabetString(10),
    lastName: randomAlphabetString(10),
    company: randomAlphabetString(10),
    country: 'AD',
    email: randomAlphabetString(10),
    interestedIn: 'Support',
    howCanWeHelp: randomAlphabetString(10),
  };
};
