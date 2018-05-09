const initialState = {
  //url: '',
  url: 'http://www.biohof-sadleder.at/',
  //url: 'http://www.vorderweissenbach.at/',
  pagespeeddata: '',
  pagespeeddatamobile: '',
  classNames: '',
  chordData: '',
  colorData: '',
  cssChartData: '',
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
    case 'SET_CLASSNAMELIST':
      return {
        ...state,
        classNames: action.payload

      };
    case 'SET_CHORDDATA':
      return {
        ...state,
        chordData: action.payload

      };
    case 'SET_COLORDATA':
      return {
        ...state,
        colorData: action.payload

      };
    case 'SET_CSS_CHARTDATA':
      return {
        ...state,
        cssChartData: action.payload

      };
    default:
      return state;
  }

};

export default urlReducer;