let runningTotal = 0;
let bufferNumber = "0";
let previousOperator = null;
const display = document.querySelector(".calc-display");

document
  .querySelector(".calc-background")
  .addEventListener("click", function(event) {
    buttonClick(event.target.innerText);
  });

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  reRender();
}

function handleNumber(value) {
  if (bufferNumber === "0") {
    bufferNumber = value;
  } else {
    bufferNumber += value;
  }
}

function handleSymbol(value) {
  switch (value) {
    case "C":
      bufferNumber = "0";
      runningTotal = 0;
      previousOperator = null;
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(bufferNumber));
      bufferNumber = "" + runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (bufferNumber.length === 1) {
        bufferNumber = "0";
      } else {
        bufferNumber = bufferNumber.substring(0, bufferNumber.length - 1);
      }
      break;
    default:
      handleMath(value);
      break;
  }
}

function handleMath(value) {
  const intBuffer = parseInt(bufferNumber);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;

  bufferNumber = "0";
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "*") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}

function reRender() {
  display.innerText = bufferNumber;
}
