import axios from 'axios';
import { ETHER } from 'types';
import { API_CONSTANTS as API } from 'constants-app';

export const getCurrencyRate = (async(currency: ETHER) => {
  const rateUAH = await axios.get(
    `${API.API_CURRENCY_URL}?fsym=UAH&tsyms=${currency}&api_key={${process.env.API_CURRENCY_KEY}}`
  );

  return rateUAH.data;
});