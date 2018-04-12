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

export function setClassNameList(data) {
  return {
    type: 'SET_CLASSNAMELIST',
    payload: data,
  };
}
export function setChordData(data) {
  return {
    type: 'SET_CHORDDATA',
    payload: data,
  };
}
