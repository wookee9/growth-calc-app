import React, { useState } from "react";
import calcReturns from '../lib/calc-returns';
import asCash from '../lib/as-cash';
// import AutosizeInput from 'react-input-autosize';
import ContentEditable from 'react-contenteditable'


import './Calculator.css';

const Calculator = () => {
  const [capital, setCapital] = useState(1000);
  const [years, setYears] = useState(5);
  const [growthRate, setRate] = useState(7);
  const [addition, setAddition] = useState(100);

  const handleYearsChange = (e) => {
    const floatVal = parseFloat(e.target.value);
    if (typeof floatVal !== 'number') return;
    if (floatVal > 1000) return;
    setYears(floatVal);
  }

  const handleRateChange = (e) => {
    const floatVal = parseFloat(e.target.value);
    if (typeof floatVal !== 'number') return;
    setRate(floatVal);
  }

  const handleCapitalChange = (e) => {
    const floatVal = parseFloat(e.target.value);
    if (typeof floatVal !== 'number') return;
    setCapital(floatVal);
  }

  const handleAdditionChange = (e) => {
    const floatVal = parseFloat(e.target.value);
    if (typeof floatVal !== 'number') return;
    setAddition(floatVal);
  }

  const returns = calcReturns(
    parseFloat(capital || 0), 
    parseFloat(years || 0),
    parseFloat(growthRate || 0),
    parseFloat(addition || 0),
  );
  const final = returns.slice(-1)[0];
  const finalValue = final.value + final.contributions;
  const currentYear = new Date().getFullYear();

  return (
    <div className="calculator">
      <p>
        {'If I start with $ '}
        <ContentEditable
          className="editable"
          name="capital"
          html={capital.toString()}
          onChange={handleCapitalChange}
        />
      </p>
      <p>
        {' and every month I add an extra $ '}
        <ContentEditable
          className="editable"
          name="addtion"
          html={addition.toString()}
          onChange={handleAdditionChange}
        />
      </p>
      <p>
        {' growing at '}
        <ContentEditable
          className="editable"
          name="growth-rate"
          html={growthRate.toString()}
          onChange={handleRateChange}
        />
        {' % a year, '}
      </p>
      <p>
        {'after '}
        <ContentEditable
          className="editable"
          name="years"
          html={years.toString()}
          onChange={handleYearsChange}
        />
        {' years, I would have...'}
      </p>

      <h3>{asCash(finalValue)}</h3>

      <ul>
        {
          returns.map(({ value, contributions }, year) => (
            <li key={year}>
              {`${year}. ${currentYear + year} `}
              <strong>
                {`- ${asCash(value + contributions)} `}
              </strong>
              {
                contributions !== 0 && 
                `= ${asCash(value)} + ${asCash(contributions)}`
              }
            </li>
          ))
        }
      </ul>
    </div>
  )
};

export default Calculator
