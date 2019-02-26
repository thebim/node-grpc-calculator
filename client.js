const grpc_loader = require('./utilities/grpc_loader');
const Calculator = grpc_loader({
  file: 'calculator',
  package: 'calculator',
  service: 'Calculator',
  url: 'localhost:30003'
});

function add(operand1, operand2) {
  Calculator.add({ operand1, operand2 }, (err, response) => {
    if (err) console.log(err);
    console.log(`${operand1} + ${operand2} = ${response.result}`);
  });
}

function subtract(operand1, operand2) {
  Calculator.subtract({ operand1, operand2 }, (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${operand1} - ${operand2} = ${response.result}`);
    }
  });
}

function multiply(operand1, operand2) {
  Calculator.multiply({ operand1, operand2 }, (err, response) => {
    if (err) console.log(err);
    console.log(`${operand1} * ${operand2} = ${response.result}`);
  });
}

function divide(operand1, operand2) {
  Calculator.divide({ operand1, operand2 }, (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${operand1} / ${operand2} = ${response.integer}r${response.remainder}`);
    }
  });
}

function main() {
  add(100, 200);
  subtract(26, 21);
  subtract(55, 11);
  multiply(7, 7);
  divide(52, 7);
}

main();
