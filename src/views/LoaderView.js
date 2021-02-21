export default class LoaderView {
  $loader = null;
  $loaderContent = null;

  constructor() {
    this.$loader = document.querySelector('.loader');
    this.$loaderContent = document.querySelector('.loader-content');
  }

  show = (msg) => {
    this.$loaderContent.innerText = msg;
    this.$loader.style.display = '';
  };

  hide = () => {
    this.$loader.style.display = 'none';
  };
}
