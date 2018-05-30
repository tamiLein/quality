import /*React, */ {Component} from 'react';
import http from 'http';
import {connect} from 'react-redux';
import htmlparser from 'htmlparser';
import htmlparser2 from 'htmlparser2';

import {setClassNameList, setChordData} from './../../redux/actions';


class ParseHTML extends Component {

  constructor(props) {
    super(props);
    this.renderDom2 = this.renderDom2.bind(this);
    this.parseDomArray = this.parseDomArray.bind(this);
    this.httpRequest = this.httpRequest.bind(this);

  }

  componentDidMount() {
    this.httpRequest();
  }

  httpRequest(){
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



    /*http.get(url, (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        console.log('----chunk', chunk);
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        console.log(JSON.parse(data).explanation);
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });*/

    /*fetch(url)
        .then(res => res.html())
        .then((out) => {
          console.log('out html', out);
        }).then(() => {
    })
        .catch(err => {
          console.log('parse html error', err);
          throw err
        });*/

  }

  renderDom(responseText) {
    //const rawHtml = document.body.innerHTML;
    //console.log('rawHTML', rawHtml);
    const rawHtml = responseText;
    const handler = new htmlparser.DefaultHandler(function (error, dom) {
      if (error)
        console.log('error', error);
      else {
      //console.log('no error');
      }
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
    this.props.dispatch(setChordData(chordData));
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