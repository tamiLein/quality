const initialState = {
  //url: '',
  url: 'http://www.biohof-sadleder.at/',
};

const urlReducer = function (state = initialState, action) {

  switch (action.type) {
    case 'SET_URL':
      return {
          ...state,
          url: action.payload

      };
    case 'SET_PAGESPEEDDATA':
      return {
        ...state,
        pagespeeddata: action.payload

      };
    case 'SET_PAGESPEEDDATAMOBILE':
      return {
        ...state,
        pagespeeddatamobile: action.payload

      };
    default:
      return state;
  }

};

export default urlReducer;