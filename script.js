const billInputElement = document.getElementById("bill-input-id");
const customTipInputElement = document.getElementById("custom-tip-input-id");
const personCountInputElement = document.getElementById(
  "person-count-input-id"
);
const tipAmountElement = document.getElementById("tip-amount-id");
const totalAmountElement = document.getElementById("total-amount-id");
const resetButtonElement = document.getElementById("reset-button-id");
const errorTextElment = document.getElementById("error-text-id");
errorTextElment.style.display = "none";
let nTip;

document.querySelectorAll("button[data-tip-percentage]").forEach((oButton) => {
  oButton.addEventListener("click", onStandardTipPress);
});

billInputElement.addEventListener("input", onBillLiveInputChange);
customTipInputElement.addEventListener("input", onCustomTipLiveInputChange);
personCountInputElement.addEventListener("input", onPersonCountLiveInputChange);
resetButtonElement.addEventListener("click", onResetButtonPress);
fnCalculateAmount();

function onStandardTipPress(oEvent) {
  document
    .querySelectorAll("button[data-tip-percentage]")
    .forEach((oButton) => {
      oButton.classList.remove("focused-button-class");
    });
  nTip = Number(oEvent.target.dataset.tipPercentage);
  const nBillAmount = Number(billInputElement.value);
  const nPersonCount = Number(personCountInputElement.value);
  oEvent.target.classList.add("focused-button-class");
  customTipInputElement.value = "";
  fnCalculateAmount(nBillAmount, nTip, nPersonCount);
}

function onCustomTipLiveInputChange(oEvent) {
  document
    .querySelectorAll("button[data-tip-percentage]")
    .forEach((oButton) => {
      oButton.classList.remove("focused-button-class");
    });
  const sValue = oEvent.target.value;
  const sRegex = /^\d+$/;
  const nPersonCount = Number(personCountInputElement.value);
  const nBillAmount = Number(billInputElement.value);
  if (sRegex.test(sValue)) {
    nTip = Number(sValue);
  } else {
    nTip = sValue.slice(0, -1);
  }
  oEvent.target.value = nTip;
  nTip = Number(nTip);
  fnCalculateAmount(nBillAmount, nTip, nPersonCount);
}

function onPersonCountLiveInputChange(oEvent) {
  errorTextElment.style.display = "none";
  oEvent.target.classList.remove("error-input-class");
  const sValue = oEvent.target.value;
  const sRegex = /^\d+$/;
  const nBillAmount = Number(billInputElement.value);
  let nPersonCount;
  if (sRegex.test(sValue)) {
    nPersonCount = Number(sValue);
    if (!nPersonCount) {
      errorTextElment.style.display = "block";
      oEvent.target.classList.add("error-input-class");
    }
  } else {
    nPersonCount = sValue.slice(0, -1);
  }
  oEvent.target.value = nPersonCount;
  fnCalculateAmount(nBillAmount, nTip, Number(nPersonCount));
}

function onBillLiveInputChange(oEvent) {
  const sValue = oEvent.target.value;
  const sRegex = /^(\d+(\.\d*)?|\.\d+)$/;
  const nPersonCount = Number(personCountInputElement.value);
  let nBillAmount;
  if (sRegex.test(sValue)) {
    nBillAmount = sValue;
    if (Number(nBillAmount) * 100 !== Math.round(Number(nBillAmount) * 100)) {
      nBillAmount = Number(nBillAmount).toFixed(2);
    }
  } else {
    nBillAmount = sValue.slice(0, -1);
  }
  oEvent.target.value = nBillAmount;
  fnCalculateAmount(Number(nBillAmount), nTip, nPersonCount);
}

function fnCalculateAmount(nBillAmount, nTip, nPersonCount) {
  if (nTip && nPersonCount && nBillAmount) {
    const nTipPerPerson = (((nTip / 100) * nBillAmount) / nPersonCount).toFixed(
      2
    );
    const nTotalPerPerson = (
      (((100 + nTip) / 100) * nBillAmount) /
      nPersonCount
    ).toFixed(2);
    tipAmountElement.innerText = `$${nTipPerPerson}`;
    totalAmountElement.innerText = `$${nTotalPerPerson}`;
  } else {
    tipAmountElement.innerText = `$0.00`;
    totalAmountElement.innerText = `$0.00`;
  }
}

function onResetButtonPress() {
  document
    .querySelectorAll("button[data-tip-percentage]")
    .forEach((oButton) => {
      oButton.classList.remove("focused-button-class");
    });
  errorTextElment.style.display = "none";
  personCountInputElement.classList.remove("error-input-class");
  billInputElement.value = "";
  customTipInputElement.value = "";
  personCountInputElement.value = "";
  nTip = "";
  fnCalculateAmount();
}
