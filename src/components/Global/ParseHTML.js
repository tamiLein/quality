import /*React, */ {Component} from 'react';
import {connect} from 'react-redux';
import htmlparser from 'htmlparser';
import htmlparser2 from 'htmlparser2';

import {setClassNameList, setChordData, setCSSLinks} from './../../redux/actions';


class ParseHTML extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };
    this.renderDom2 = this.renderDom2.bind(this);
    this.parseDomArray = this.parseDomArray.bind(this);
    this.httpRequest = this.httpRequest.bind(this);

  }

  componentDidMount() {
    this.httpRequest();
  }

  componentDidUpdate() {
    if (this.props.url !== this.state.url) {
      this.httpRequest();
    }
  }

  httpRequest() {

    this.setState({
      url: this.props.url,
    });

    const that = this;
    let url = 'https://cors-anywhere.herokuapp.com/' + this.props.url;
    const request = new XMLHttpRequest();

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200)
        that.renderDom(this.responseText);
      that.renderDom2(this.responseText);
    };
    request.open("GET", url, true);
    request.send();

  }

  renderDom(responseText) {
    //const rawHtml = document.body.innerHTML;
    const rawHtml = responseText;

    const handler = new htmlparser.DefaultHandler(function (error, dom) {
      if (error)
        console.log('error', error);
    }, {
      verbose: false,
      ignoreWhitespace: true
    });

    const parser = new htmlparser.Parser(handler);
    parser.parseComplete(rawHtml);

    this.parseDomArray(handler.dom);
  }

  parseDomArray(dom) {
    let chordData = [];

    let cssLinks = [];

    for (let i = 0; i < dom.length; i++) {

      if (dom[i].type === "tag") {

        if (dom[i].children) {
          let returnElement = [];
          let getchildren = this.checkChildren(dom[i], returnElement);

          for (let j = 0; j < getchildren.length; j++) {
            chordData[chordData.length] = getchildren[j];
          }
        } else {
          chordData.push({
            'node': dom[i].name,
            'root': 'plain text',
            'count': 1,
          })
        }
      }
    }

    // get css links
    let html = dom[dom.length - 1].children;
    let head = '';

    for (let i = 0; i < html.length; i++) {
      if (html[i].type === 'tag' && html[i].name === 'head') {
        head = html[i].children;
      }
    }

    for (let i = 0; i < head.length; i++) {
      if (head[i].type === 'tag' && head[i].name === 'link') {
        if (head[i].attribs.rel === 'stylesheet') {
          cssLinks.push(head[i].attribs.href);
        }
      }
    }


    this.props.dispatch(setChordData(chordData));
    this.props.dispatch(setCSSLinks(cssLinks));
  }

  checkChildren = function (domElement, returnElement) {

    if (!domElement.children) {
      /*if (domElement.name) {
       returnElement.push({
       'node': domElement.name,
       'root': 'no children - check' + domElement.name,
       'count': 0
       });
       }*/
    } else {
      for (let i = 0, count = domElement.children.length; i < count; i++) {
        if (domElement.name) {
          returnElement.push({
            'node': domElement.name,
            'root': domElement.children[i].name ? domElement.children[i].name : 'plain text',
            'count': 1
          });
          this.checkChildren(domElement.children[i], returnElement);
        }


      }
    }
    return returnElement;
  };

  renderDom2(responseText) {

    let classNamesArray = [];
    let classList;
    const that = this;

    const parser = new htmlparser2.Parser({
      onopentag: function (name, attributes) {
        if (attributes.class) {
          classList = attributes.class.split(" ");
          classList.forEach(function (element) {
            let findobj = classNamesArray.find(function (findobj) {
              return findobj.CLASS === element;
            });
            if (findobj && findobj.CLASS === element) {
              findobj.VALUE = findobj.VALUE + 1;
            } else {
              let obj = {
                'CLASS': element,
                'VALUE': 1
              };
              classNamesArray.push(obj);
            }
          });
        }
      },
      onend: function () {
        that.props.dispatch(setClassNameList(classNamesArray));
      }
    }, {decodeEntities: true});

    parser.write(responseText);
    parser.end();

  };


  render() {
    return null;
  }
}

const stateMap = (state) => {
  return {
    chordData: state.chordData,
    url: state.url,
  };
};

export default connect(stateMap)(ParseHTML);