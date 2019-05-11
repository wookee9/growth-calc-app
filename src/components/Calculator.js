import React, { useState } from "react"
import { Finance } from "financejs";

const finance = new Finance();

const calcReturns = (capitalStr, yearsStr, rateStr) => {
  if (yearsStr === '' || rateStr === '' || capitalStr === '') return [0];

  const capital = parseInt(capitalStr);
  const years = parseInt(yearsStr);
  const rate = parseInt(rateStr);

  const yearsArr = Array(years).fill(null);

  return yearsArr.map((_, year) => finance.FV(rate, capital, year));
};

const Calculator = () => {
  const [capital, setCapital] = useState('1000');
  const [years, setYears] = useState('5');
  const [growthRate, setRate] = useState('7');

  const handleYearsChange = (e) => {
    setYears(e.target.value);
  }

  const handleRateChange = (e) => {
    setRate(e.target.value);
  }

  const handleCapitalChange = (e) => {
    setCapital(e.target.value);
  }

  const returns = calcReturns(capital, years, growthRate);
  const finalValue = returns.slice(-1)[0];

  return (
    <div>
      <p>
        {'Starting capital: '}
        $ <input type="text" value={capital} onChange={handleCapitalChange} />
      </p>

      <p>
        {'Number of years: '}
        <input type="text" value={years} onChange={handleYearsChange} />
      </p>

      <p>
        {'Growth rate %: '}
        <input type="text" value={growthRate} onChange={handleRateChange} />
      </p>

      <h3>{'Returns: '}</h3>
      <p>$ {finalValue.toFixed(2)}</p>

      <ol>
        {
          returns.map((ret, year) => (
            <li key={year}>{`${2019 + year}`} - ${ret.toFixed(2)}</li>
          ))
        }
      </ol>
    </div>
  )
};

export default Calculator
