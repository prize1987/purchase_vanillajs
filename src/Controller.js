import OptionModel from './models/OptionModel.js';
import StockModel from './models/StockModel.js';
import OptionView from './views/OptionView.js';
import ChoicedItemView from './views/ChoicedItemView.js';
import LoaderView from './views/LoaderView.js';

export default class Controller {
  constructor() {
    this.optionModel = new OptionModel();
    this.stockModel = new StockModel();
    this.optionView = new OptionView(document.querySelector('div.options-wrapper'));
    this.loaderView = new LoaderView(document.querySelector('div.loader'));

    this.optionView.bindChangeMainOption(this.handleChangeMainOption);

    this.onPageLoad();
  }

  // data handling
  onPageLoad = async () => {
    this.loaderView.show('option loading');

    const mainOptions = await this.optionModel.getMainOption();
    this.optionView.displayMainOption(mainOptions);

    this.loaderView.hide();
  };

  // OptionView
  handleChangeMainOption = async (optionId) => {
    this.loaderView.show('sub-option loading');

    const subOptions = await this.optionModel.getSubOptions(optionId);
    this.optionView.displaySubOptions(subOptions);

    this.loaderView.hide();

    const optionIds = subOptions.map((option) => option.id).join(',');
    const stockInfo = await this.stockModel.getStockInfo(optionIds);
    console.log(stockInfo);
  };

  // StockInfo
}
