import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AppReducer from '../reducers/AppReducer';
import axios from 'axios';
// const getLocalStorage = () => {
//   let transactions = localStorage.getItem('transactions');
//   if (transactions) {
//     return JSON.parse(localStorage.getItem('transactions'));
//   } else {
//     return [];
//   }
// };
// initial state
const intialState = {
  // transactions: getLocalStorage(),
  transactions: [],
  error: null,
  loading: true,
};

const GlobalContext = createContext('');

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, intialState);

  // useEffect(() => {
  //   localStorage.setItem('transactions', JSON.stringify(state.transactions));
  // }, [state.transactions]);
  // actions

  const getTransactions = async () => {
    try {
      // added proxy so no need to put localhost before
      const { data } = await axios('/api/v1/transactions');
      dispatch({ type: 'GET_TRANSACTIONS', payload: data.data });
    } catch (error) {
      dispatch({ type: 'TRANSACTION_ERROR', payload: error.response.data });
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    } catch (error) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: error.response.data.error,
      });
    }
  };

  const addTransaction = async (transaction) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post(`/api/v1/transactions`, transaction, config);
      dispatch({ type: 'ADD_TRANSACTION', payload: res.data.data });
    } catch (error) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: error.response.data.error,
      });
    }
  };
  return (
    <GlobalContext.Provider
      value={{ ...state, deleteTransaction, addTransaction, getTransactions }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
export { GlobalContext, AppProvider };
