import React from 'react';
import { useGlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';
const Balance = () => {
  const { transactions } = useGlobalContext();
  let amount = transactions.map((transaction) => transaction.amount);
  let total = amount.reduce((acc, item) => acc + item, 0).toFixed(2);
  return (
    <>
      <h4>Your Balance</h4>
      <h1 id="balance">${numberWithCommas(total)}</h1>
    </>
  );
};

export default Balance;
