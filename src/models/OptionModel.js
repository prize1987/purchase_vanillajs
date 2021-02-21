import { api } from '../api/api.js';

export default class OptionModel {
  constructor() {
    this.mainOption = [];
    this.subOptions = [];
  }

  getSubOptions = async (parentId) => {
    if (this.subOptions[parentId] !== undefined) {
      return this.subOptions[parentId];
    } else {
      return (this.subOptions[parentId] = await this.fetchSubOptions(parentId));
    }
  };

  fetchSubOptions = async (parentId) => {
    const response = await api.fetchSubOptions(parentId);
    if (response.ok) {
      return response.data;
    } else {
      console.log('fetchSubOption error', response.data);
      return null;
    }
  };

  getMainOption = async () => {
    if (this.mainOption.length > 0) {
      return this.mainOption;
    } else {
      return (this.mainOption = await this.fetchMainOption());
    }
  };

  fetchMainOption = async () => {
    const response = await api.fetchOptions();
    if (response.ok) {
      return response.data;
    } else {
      console.log('fetchMainOption error', response.data);
      return null;
    }
  };
}
