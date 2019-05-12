const calcReturns = (capital = 0, years = 0, rate = 0, addition = 0) => {
  const yearsArr = Array(years).fill(null);

  return yearsArr.reduce((accum, next, index) => {
    const lastValue = accum.slice(-1)[0].value;
    const contributions = addition * 12;
    const value = (lastValue + (index ? contributions : 0)) * (1 + rate / 100);

    return [
      ...accum,
      { value, contributions, },
    ]
  }, [{ value: capital, contributions: 0 }])
};

export default calcReturns;
