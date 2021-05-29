import React, { useEffect } from 'react';
import Transaction from './Transaction';
import { useGlobalContext } from '../context/GlobalState';
const TransactionList = () => {
  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line
  }, []);
  const { transactions, getTransactions } = useGlobalContext();
  return (
    <div>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction) => {
          return (
            <Transaction key={transaction._id} transaction={transaction} />
          );
        })}
      </ul>
    </div>
  );
};

export default TransactionList;
