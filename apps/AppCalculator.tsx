import React, { useState } from 'react';
import { AppInstanceProps } from '../types';

export const AppCalculator: React.FC<AppInstanceProps> = () => {
    const [display, setDisplay] = useState('0');
    const [firstOperand, setFirstOperand] = useState<number | null>(null);
    const [operator, setOperator] = useState<string | null>(null);
    const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

    const inputDigit = (digit: string) => {
        if (waitingForSecondOperand) {
            setDisplay(digit);
            setWaitingForSecondOperand(false);
        } else {
            setDisplay(display === '0' ? digit : display + digit);
        }
    };
    
    const inputDecimal = () => {
        if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    };
    
    const clearDisplay = () => {
        setDisplay('0');
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
    };

    const toggleSign = () => {
        setDisplay(String(parseFloat(display) * -1));
    };

    const inputPercent = () => {
        setDisplay(String(parseFloat(display) / 100));
    };

    const performOperation = (nextOperator: string) => {
        const inputValue = parseFloat(display);
        if (firstOperand === null) {
            setFirstOperand(inputValue);
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            setDisplay(String(result));
            setFirstOperand(result);
        }
        setWaitingForSecondOperand(true);
        setOperator(nextOperator);
    };
    
    const calculate = (first: number, second: number, op: string) => {
        switch (op) {
            case '+': return first + second;
            case '-': return first - second;
            case '*': return first * second;
            case '/': return first / second;
            default: return second;
        }
    };

    const handleEquals = () => {
        if(operator && firstOperand !== null){
            const result = calculate(firstOperand, parseFloat(display), operator);
            setDisplay(String(result));
            setFirstOperand(null);
            setOperator(null);
            setWaitingForSecondOperand(true);
        }
    }

    const buttons = [
        ['AC', '+/-', '%', '/'],
        ['7', '8', '9', '*'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['0', '.', '='],
    ];
    
    const getButtonClass = (btn: string) => {
        if(['/', '*', '-', '+', '='].includes(btn)) return 'bg-orange-500 hover:bg-orange-600 text-white';
        if(['AC', '+/-', '%'].includes(btn)) return 'bg-gray-400 hover:bg-gray-500 text-black';
        return 'bg-gray-600 hover:bg-gray-700 text-white';
    };

    const handleButtonClick = (btn: string) => {
        if (btn >= '0' && btn <= '9') {
            inputDigit(btn);
        } else if (btn === '.') {
            inputDecimal();
        } else if (btn === 'AC') {
            clearDisplay();
        } else if (btn === '+/-') {
            toggleSign();
        } else if (btn === '%') {
            inputPercent();
        } else if (btn === '=') {
            handleEquals();
        } else {
            performOperation(btn);
        }
    };

    return (
        <div className="w-full h-full bg-black text-white flex flex-col">
            <div className="flex-1 flex items-end justify-end p-6">
                <span className="text-6xl font-light">{display}</span>
            </div>
            <div className="grid grid-cols-4 gap-px">
                {buttons.flat().map((btn, i) => (
                    <button 
                        key={i} 
                        onClick={() => handleButtonClick(btn)}
                        className={`text-2xl h-20 ${getButtonClass(btn)} ${btn === '0' ? 'col-span-2' : ''}`}
                    >
                        {btn}
                    </button>
                ))}
            </div>
        </div>
    );
};