import React, {Component} from 'react';
import {connect} from 'react-redux';
import htmlparser from 'htmlparser';


class ParseHTML extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {


    var request = this.makeHttpObject();
    request.open("GET", this.props.url, true);
    request.send(null);
    request.onreadystatechange = function() {
      if (request.readyState == 4)
        console.log('parse', request);
    };


    var rawHtml = "Xyz <script language= javascript>var foo = '<<bar>>';< /  script><!--<!-- Waah! -- -->";
    var handler = new htmlparser.DefaultHandler(function (error, dom) {
      if (error)
        console.log('error', error);
      else
        console.log('no error');
    });
    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(rawHtml);
    console.log('dom', handler.dom);
  }


   makeHttpObject() {
   try {return new XMLHttpRequest();}
   catch (error) {}
   /*try {return new ActiveXObject("Msxml2.XMLHTTP");}
   catch (error) {}
   try {return new ActiveXObject("Microsoft.XMLHTTP");}
   catch (error) {}
   */
   throw new Error("Could not create HTTP request object.");
   }


  render() {
    return null;
  }
}

const stateMap = (state) => {
  return {
    url: state.url
  };
};

export default connect(stateMap)(ParseHTML);
