import axios from 'axios';
import { META_CONSTANTS as META } from 'constants-app';

export const getCurrencyRate = (async() => {
  const rateUAH = await axios.get(
    `${META.API_CURRENCY_URL}?fsym=UAH&tsyms=ETH&api_key={${META.API_CURRENCY_KEY}}`
  );

  return rateUAH.data;
});