import { api } from '../api/api.js';

export default class StockModel {
  constructor() {
    this.stockInfo = [];
  }

  getStockInfo = (optionIds) => {
    const response = api.fetchStocks(optionIds);
    if (response.ok) {
      this.stockInfo = response.data;
      console.log(this.stockInfo);
      debugger;
    } else {
      console.log('fetchStockInfo error', response.data);
      return null;
    }
  };
}
