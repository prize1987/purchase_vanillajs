export default class OptionView {
  constructor(el) {
    this.$wrapper = el;
    this.$mainSelect = this.$wrapper.querySelector('div.options select');
    this.$subSelect = this.$wrapper.querySelector('div.sub-options select');
  }

  displayMainOption = (options) => {
    this.$mainSelect.innerHTML = '';
    this.$subSelect.hidden = true;
    options.forEach((option) => {
      const $option = document.createElement('option');
      $option.id = option.id;
      $option.innerText = option.optionName;

      this.$mainSelect.appendChild($option);
    });
  };

  displaySubOptions = (options) => {
    this.$subSelect.innerHTML = '';
    this.$subSelect.hidden = false;
    options.forEach((option) => {
      const $option = document.createElement('option');
      $option.id = option.id;
      $option.innerText = option.optionName;

      this.$subSelect.appendChild($option);
    });
  };

  bindChangeMainOption = (handler) => {
    this.$mainSelect.addEventListener('change', (e) => {
      handler(e.target[e.target.selectedIndex].id);
    });
  };

  render = () => {};
}
