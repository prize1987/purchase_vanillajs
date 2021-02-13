import { api } from './api/api.js';

export default class OptionModel {
  mainOptions = [];
  subOptions = new Map();

  constructor() { }

  getSubOptions = async (id) => {
    if (this.subOptions.has(id)) {
      return this.subOptions.get(id);
    } else {
      const response = await api.fetchSubOptions(id);
      if (response.ok) {
        // load stock and price
        const ids = response.data.map(d => d.id).join(",");
        const stockInfos = await api.fetchStocks(ids);
        response.data.forEach((d) => {
          d.stock = stockInfos.data[d.id]?.stock;
          d.optionPrice = stockInfos.data[d.id]?.optionPrice;
        });

        this.subOptions.set(id, response.data);
        return response.data;
      } else {
        return null;
      }
    }
  }

  getMainOptions = async () => {
    if (this.mainOptions.length > 0) {
      return this.mainOptions;
    } else {
      const response = await api.fetchOptions();
      if (response.ok) {
        this.mainOptions = response.data;
        return response.data;
      } else {
        return null;
      }
    }
  }
}
