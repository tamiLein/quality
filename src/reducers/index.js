const initialState = {
  //url: '',
  url: 'https://www.google.at/',
};

const urlReducer = function (state = initialState, action) {

  switch (action.type) {
    case 'SET_URL':
      return {
          ...state,
          url: action.payload

      };
    default:
      return state;
  }

};

export default urlReducer;