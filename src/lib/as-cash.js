const asCash = (value) => (
  `$${
    new Intl.NumberFormat().format(
      value,
      'en-US', 
      { style: 'currency', currency: 'USD' }
    )
  }`
);

export default asCash;
