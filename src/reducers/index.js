const initialState = {
  url: '',
  //url: 'http://www.fh-ooe.at/',
  //url: 'http://www.vorderweissenbach.at/',
  pagespeeddata: '',
  pagespeeddatamobile: '',
  classNames: '',
  chordData: '',
  colorData: '',
  cssChartData: '',
  htmlChartData: '',
  cssLinks: '',
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
    case 'SET_HTML_CHARTDATA':
      return {
        ...state,
        htmlChartData: action.payload

      };
    case 'SET_CSSLINKS':
      return {
        ...state,
        cssLinks: action.payload

      };
    default:
      return state;
  }

};

export default urlReducer;