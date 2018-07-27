class WalletModel {
  constructor(money) {
    this.money = money;
    this.fullAmount = this.getFullAmount(this.money);
    this.notifyDecreasedMoney = null;
    this.notifyNoUnit = null;
  }

  getMoneyList() {
    return this.money;
  }

  getFullAmount(money) {
    const moneyUnit = Object.keys(money);
    const moneyNumber = Object.values(money);
    const fullAmount = moneyUnit.reduce((acc, ele, idx) => {
      acc += (ele * moneyNumber[idx]);
      return acc;
    }, 0);
    return fullAmount;
  }

  decreaseMoney(price) {
    if (this.money[price] === 0) {
      this.notifyNoUnit(price);
      return;
    }
    this.money[price] -= 1;
    this.fullAmount -= Number(price);
    this.notifyDecreasedMoney(price, this.fullAmount);
  }
}