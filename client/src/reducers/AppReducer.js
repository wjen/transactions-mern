const reducer = (state, action) => {
  if (action.type === 'GET_TRANSACTIONS') {
    return {
      ...state,
      loading: false,
      transactions: action.payload,
    };
  }
  if (action.type === 'TRANSACTION_ERROR') {
    return { ...state, error: action.payload, loading: false };
  }
  if (action.type === 'DELETE_TRANSACTION') {
    return {
      ...state,
      transactions: state.transactions.filter(
        (transaction) => transaction._id !== action.payload
      ),
    };
  }

  if (action.type === 'ADD_TRANSACTION') {
    return {
      ...state,
      transactions: [...state.transactions, action.payload],
    };
  }
  return state;
};

export default reducer;
