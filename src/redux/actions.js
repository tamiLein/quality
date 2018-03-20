export function setUrl(url) {
  return {
    type: 'SET_URL',
    payload: url,
  };
}


export function setPagespeeddata(data) {
  return {
    type: 'SET_PAGESPEEDDATA',
    payload: data,
  };
}

export function setPagespeeddataMobile(data) {
  return {
    type: 'SET_PAGESPEEDDATAMOBILE',
    payload: data,
  };
}