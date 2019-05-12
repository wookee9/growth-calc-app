import React, { useState } from "react";
import calcReturns from '../lib/calc-returns';
import asCash from '../lib/as-cash';

const Calculator = () => {
  const [capital, setCapital] = useState(1000);
  const [years, setYears] = useState(5);
  const [growthRate, setRate] = useState(7);
  const [addition, setAddition] = useState(100);

  const handleYearsChange = (e) => {
    if (e.target.value > 1000) return;
    setYears(e.target.value);
  }

  const handleRateChange = (e) => {
    setRate(e.target.value);
  }

  const handleCapitalChange = (e) => {
    setCapital(e.target.value);
  }

  const handleAdditionChange = (e) => {
    setAddition(e.target.value);
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
    <div>
      <p>
        {'Starting capital: '}
        $ <input type="number" value={capital} onChange={handleCapitalChange} />
      </p>

      <p>
        {'Monthly contributions: '}
        $ <input type="number" value={addition} onChange={handleAdditionChange} />
      </p>

      <p>
        {'Number of years: '}
        <input type="number" value={years} onChange={handleYearsChange} />
      </p>

      <p>
        {'Growth rate: % '}
        <input type="number" value={growthRate} onChange={handleRateChange} />
      </p>

      <h2>{'Returns: '}</h2>
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
