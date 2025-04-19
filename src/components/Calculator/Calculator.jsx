import React from 'react';
import './Calculator.css';
import { buttons } from '../../constants';
import { useState } from 'react';

const Calculator = () => {
  const [pressedButton, setPressedButton] = useState(null);
  const [display, setDisplay] = useState('0');
  const [operator, setOperator] = useState('');
  const [hasOperator, setHasOperator] = useState(false);
  const [overwrite, setOverwrite] = useState(false);
  const [hasDot, setHasDot] = useState(false);

  // press effect
  const handleMouseDown = (index) => {
    setPressedButton(index);
    setTimeout(() => {
      setPressedButton(null);
    }, 180);
  };

  // input
  const handleInput = (type, keyValue) => {
    setOverwrite(false);

    if (keyValue === 'C') {
      setDisplay('0');
      setOperator('');
      setOverwrite(false);
      setHasOperator(false);
      setHasDot(false);
    }

    if (overwrite && type === 'num') {
      setDisplay(keyValue);
      setOverwrite(false);
    }

    if (type === 'num' && display !== '0' && !overwrite) {
      setDisplay((prev) => prev + keyValue);
    }

    if (type === 'num' && display === '0') {
      setDisplay(keyValue);
    }

    if (type === 'op' && !hasOperator) {
      setOperator(keyValue);
      setDisplay((prev) => prev + keyValue);
      setHasOperator(true);
      setHasDot(false);
    }

    if (type === 'mod' && display.slice(-1) !== '.' && display.slice(-1) !== operator && !hasDot) {
      setDisplay((prev) => prev + keyValue);
      setHasDot(true);
    }

    if (keyValue === '=' && display.slice(-1) !== operator) {
      const operands = display.split(operator);
      const firstOperand = operands[0];
      const secondOperand = operands[1];
      setDisplay(calculate(firstOperand, secondOperand, operator));
      setOverwrite(true);
      setOperator('');
      setHasOperator(false);
      setHasDot(false);
    }
  };

  // calculation
  const calculate = (a, b, op) => {
    const x = parseFloat(a);
    const y = parseFloat(b);

    switch (op) {
      case '+':
        return x + y;
      case '-':
        return x - y;
      case '*':
        return x * y;
      case '/':
        return y === 0 ? 'Ошибка. Деление на ноль' : x / y;
      default:
        return 0;
    }
  };

  return (
    <div className="calculator">
      <div className="calculator__container">
        <input className="calculator__display" title="display" type="text" value={display} disabled />
        <div className="calculator__buttons">
          {buttons.map((button) => {
            return (
              <button
                type="button"
                className={`button ${button.className} ${pressedButton === button.value ? 'pressed' : ''}`}
                data-type={button.type}
                key={button.value}
                onMouseDown={() => handleMouseDown(button.value)}
                onClick={() => handleInput(button.type, button.value)}
              >
                {button.value}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
