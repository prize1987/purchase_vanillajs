import OptionModel from './OptionModel.js';
import ChoicedItemView from './ChoicedItemView.js';
import Loader from './Loader.js';

const optionModel = new OptionModel();
const choicedItemView = new ChoicedItemView();
const loader = new Loader();

// 상품 옵션 파트
const getMainOptions = async () => {
  loader.show('옵션 로딩 중입니다..');
  const data = await optionModel.getMainOptions();
  const $options = document.querySelector('.options');
  const $optionsSelect = $options.querySelector('select');
  $optionsSelect.innerHTML = data
    .map(
      (d) => `
        <option id=${d.id}>${d.optionName}</option>
    `
    )
    .join('');

  // add select event
  $optionsSelect.addEventListener('change', onSelectOption);
  loader.hide();
};

const onSelectOption = (e) => {
  const target = e.target;
  const selectedId = target.options[e.target.selectedIndex].id;
  drawAdditionalOptions(selectedId);
};

const onSelectSubOption = (e) => {
  const options = document.querySelectorAll('.options select');
  const info = Array.from(options)
    .map((option) => option.value)
    .join(' ');

  choicedItemView.addData(info);
};

const drawAdditionalOptions = async (id) => {
  loader.show('두번째 옵션 로딩 중입니다..');
  const subOptions = await optionModel.getSubOptions(id);
  if (subOptions.length > 0) {
    const $select = document.createElement('select');
    $select.className = 'sub-option';

    $select.innerHTML = subOptions
      .map(
        (data) => `
            <option id=${data.id}>${data.optionName}(+${data.optionPrice}원, 재고 : ${data.stock}개)</option>
        `
      )
      .join('');

    $select.addEventListener('change', onSelectSubOption);

    const $target = document.querySelector('.options');
    const $suboption = $target.querySelector('.sub-option');
    $suboption?.remove();
    $target.appendChild($select);
    console.log(subOptions);
  }
  loader.hide();
};

const onClickOrder = () => {
  choicedItemView.onOrder();
};

const init = () => {
  getMainOptions();

  const orderButton = document.querySelector('.order-button');
  orderButton.addEventListener('click', onClickOrder);
};

init();
