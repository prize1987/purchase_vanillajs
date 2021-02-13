export default class ChoicedItemView {
  $target = null;
  items = new Map();

  constructor(){
    this.$target = document.querySelector(".selected-options");
  }

  addData = (data, detail) => {
    console.log(detail);
    if(!this.items.has(data)){
      this.items.set(data, 1);
      this.render();
    }
  }

  setItemQty = (itemLabel, qty) => {
    this.items.set(itemLabel, qty);
    this.render();
  }

  onChangeInput = (e) => {
    const itemLabel = e.target.id;
    const toQty = e.target.value;
    this.setItemQty(itemLabel, toQty);
  }

  onClickMinus = (e) => {
    const itemLabel = e.target.id;
    const currentQty = this.items.get(itemLabel);
    this.setItemQty(itemLabel, currentQty-1);
  }

  onClickPlus = (e) => {
    const itemLabel = e.target.id;
    const currentQty = this.items.get(itemLabel);
    this.setItemQty(itemLabel, currentQty+1);
  }

  onClickDelete = (e) => {
    const itemLabel = e.target.id;
    this.items.delete(itemLabel);
    this.render();
  }

  onOrder = () => {
    const detail = Array.from(this.items).map(item => {
      const name = item[0].slice(0, item[0].indexOf("("));
      const price = parseInt(item[0].slice(item[0].indexOf("+")+1, item[0].indexOf("원")));
      const qty = item[1];

      return `${name} ${price}원 ${qty}개, ${price*qty}원`;
    }).join("\n");

    const totalPrice = Array.from(this.items).reduce((sum, item) => {
      const price = item[0].slice(item[0].indexOf("+")+1, item[0].indexOf("원"));
      sum += (10000 + parseInt(price)) * item[1];
      return sum;
    }, 0);

    const message = detail + "\n" + `총 ${totalPrice}원`;
    alert(message);
  }

  render = () => {
    if(this.items.size > 0){
      this.$target.innerHTML = "";
      Array.from(this.items).forEach(info => {
        const $choicedItem = document.createElement("div");
        $choicedItem.className = "choiced-item";
        
        const $itemLabel = document.createElement("span");
        $itemLabel.innerText = info[0];

        const $itemQty = document.createElement("input");
        $itemQty.value = info[1];
        $itemQty.addEventListener("change", this.onChangeInput);

        const $minusBtn = document.createElement("button");
        $minusBtn.innerText = "-";
        $minusBtn.id = info[0];
        $minusBtn.addEventListener("click", this.onClickMinus);
        
        const $plusBtn = document.createElement("button");
        $plusBtn.innerText = "+";
        $plusBtn.id = info[0];
        $plusBtn.addEventListener("click", this.onClickPlus);
        
        const $deleteBtn = document.createElement("button");
        $deleteBtn.innerText = "X";
        $deleteBtn.id = info[0];
        $deleteBtn.addEventListener("click", this.onClickDelete);
        

        $choicedItem.appendChild($itemLabel);
        $choicedItem.appendChild($itemQty);
        $choicedItem.appendChild($minusBtn);
        $choicedItem.appendChild($plusBtn);
        $choicedItem.appendChild($deleteBtn);
        this.$target.appendChild($choicedItem);

        const $totalPrice = document.querySelector("span.total-price");
        const totalPrice = Array.from(this.items).reduce((sum, item) => {
          const price = item[0].slice(item[0].indexOf("+")+1, item[0].indexOf("원"));
          sum += (10000 + parseInt(price)) * item[1];
          return sum;
        }, 0);
        $totalPrice.innerText = totalPrice + "원";
      });
    }else{
      this.$target.innerText = "옵션을 선택해주세요.";
    }
  }
}