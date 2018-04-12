import /*React, */ {Component} from 'react';
import {connect} from 'react-redux';
import htmlparser from 'htmlparser';
import htmlparser2 from 'htmlparser2';

import {setClassNameList} from './../../redux/actions';


class ParseHTML extends Component {

  constructor(props) {
    super(props);
    this.renderDom2 = this.renderDom2.bind(this);

  }

  componentDidMount() {


    const that = this;
    const request = new XMLHttpRequest();
    //console.log('url', this.props.url);

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200)
      //that.renderDom(request);
      that.renderDom2();
    };
    //request.open("GET", this.props.url, true);
    request.open("GET", 'test.txt', true);
    request.send();


  }

  renderDom(request) {
    const rawHtml = document.body.innerHTML;
    //var rawHtml = request.response;
    const handler = new htmlparser.DefaultHandler(function (error, dom) {
      if (error)
        console.log('error', error);
      else
        console.log('no error');
    }, {
      verbose: false,
      ignoreWhitespace: true
    });

    const parser = new htmlparser.Parser(handler);
    parser.parseComplete(rawHtml);

    console.log('dom', handler.dom);
  }

  renderDom2(){

    let classNamesArray = [];
    let classList;
    const that = this;

    const parser = new htmlparser2.Parser({
      onopentag: function(name, attributes){
        if(attributes.class){
          classList = attributes.class.split(" ");
          classList.forEach(function(element){
            let findobj = classNamesArray.find(function (findobj) {
              return findobj.CLASS === element;
            });
            if(findobj && findobj.CLASS === element){
              findobj.VALUE = findobj.VALUE + 1;
            }else{
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

    parser.write(document.body.innerHTML);
    parser.end();

  }


  render() {
    return null;
  }
}

const stateMap = (state) => {
  return {
    classNames: state.classNames
  };
};

export default connect(stateMap)(ParseHTML);
