
export const TAB_OVERVIEW = 1;
export const TAB_HISTORY = 2;

export const SLICE_1MINUTE = 1;
export const SLICE_5MINUTES = 2;
export const SLICE_1HOUR = 3;
export const SLICE_1WEEK = 4;

export const API_MINUTE = 'https://www.fxempire.com/api/v1/en/crypto-coin/chart/candles/histominute?aggregate=1&e=CCCAGG&fsym=BTC&tsym=usd&limit=30';
export const API_5MINUTE = 'https://www.fxempire.com/api/v1/en/crypto-coin/chart/candles/histominute?aggregate=1&e=CCCAGG&fsym=BTC&tsym=usd&limit=150';
export const API_HOUR = 'https://www.fxempire.com/api/v1/en/crypto-coin/chart/candles/histohour?aggregate=1&e=CCCAGG&fsym=BTC&tsym=usd&limit=30';
export const API_WEEK = 'https://www.fxempire.com/api/v1/en/crypto-coin/chart/candles/histoday?aggregate=7&e=CCCAGG&fsym=BTC&tsym=usd&limit=30';