class VMViewer {
  constructor() {
    this.statusScreen = document.querySelector('.selector__status__items');
    this.coinStatus = document.querySelector('.selector__status__coin');
    this.selectDecision = '';
    this.vmControl = new VMController();

  }

  setMessage(message) {
    return this.statusScreen.innerText = message;
  }

  activateBtn() {
    Number(this.coinStatus.innerText) < Math.min.apply(0, bevLists.map(elem => elem.price)) ?
      // vmControl.init().disabled = true : vmControl.buttonConfirm.disabled = false;
      console.log(vmControl.init()) : console.log("???");
  }

  validateItems() {
    const bevItems = vmTemplate.beverages.querySelectorAll('.beverage__items');
    bevItems.forEach((elem, idx) => {
      Number(this.coinStatus.innerText) >= bevLists[idx].price ?
        elem.style.backgroundImage = 'linear-gradient(to top, #e6b980 0%, #eacda3 100%)' : elem.style.backgroundImage = '';
    });
  }

  purchaseItems() {
    bevLists.forEach((elem, idx) => {
      const {
        id,
        working,
        price,
        name
      } = elem;

      if (id !== this.selectDecision) return;
      if (!working) return this.setMessage("고장난 상품입니다. 다시 눌러주세요");

      if (Number(this.coinStatus.innerText) >= price) {
        this.coinStatus.innerText -= price;
        vmControl.inputCoin = Number(this.coinStatus.innerText);
        this.setMessage(`${name}(이)가 나왔습니다`);
        this.activateBtn();
      } else {
        this.setMessage("동전을 더 넣어주세요");
      }
    });
    this.selectDecision = '';
  }

  outputResult() {
    if (vmView.selectDecision) {
      this.setMessage('');
      vmTemplate.renderLoaders();
      setTimeout(() => {
        this.purchaseItems();
        this.validateItems();
      }, 1750);
    } else {
      this.setMessage('잘못된 방법입니다.');
      this.selectDecision = '';
    }
  }
}