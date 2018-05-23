import /*React, */ {Component} from 'react';
import {connect} from 'react-redux';
import cssparser from 'css';

import {setColorData} from './../../redux/actions';


class ParseCSS extends Component {

  constructor(props) {
    super(props);
    this.parseCSS = this.parseCSS.bind(this);

  }

  componentDidMount() {
    this.parseCSS();
  }


  parseCSS() {
    //console.log('-------------------------- parse CSS --------------------------');

    let backgrounds = [];
    let colors = [];
    let border = [];

    let backgroundPOS = 1;
    let colorPOS = 1;
    let borderPOS = 1;

    const css = '.panel-group .panel{-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.panel-default>.panel-heading{background-color:#fdfdfd}.panel-heading{padding:20px 25px;text-align:left;position:relative}.panel-title{display:inline}.panel-body{text-align:left;padding:0}.panel-body .col-md-12{padding-left:0;padding-right:0}.panel-collapse.collapse.in{border-top:2px solid gray}.panel-group .panel-heading+.panel-collapse>.list-group,.panel-group .panel-heading+.panel-collapse>.panel-body{border-top-width:2px}.colorbar{width:15px;height:62px;position:absolute;top:-1px;left:-15px}#panel-html .colorbar{background:#ef8160}#panel-css .colorbar{background:#db476a}#panel-performance .colorbar{background:#9f2f7f}#panel-accessibility .colorbar{background:#5e257c}#panel-global .colorbar{background:#262150}.fa{float:right;font-size:16px}.fa.arrow::before{content:"\F102"}a.collapsed .fa.arrow::before{content:"\F103"}.col-md-12.error-filter{padding:20px;border-bottom:2px solid gray}label{font-weight:400;margin:5px 10px}';

    let cssObject = cssparser.parse(css);
    let cssRules = cssObject.stylesheet.rules;
    //console.log('css test', cssRules);

    for(let i = 0; i < cssRules.length; i++){
      for(let j = 0; j < cssRules[i].declarations.length; j++) {
        //console.log('----------------------------------- property: ' + cssRules[i].declarations[j].property + '| value: ' + cssRules[i].declarations[j].value);

        if (cssRules[i].declarations[j].property === 'background-color' || cssRules[i].declarations[j].property === 'background') {
          backgrounds.push({
            'POS': backgroundPOS++,
            'COLOR': cssRules[i].declarations[j].value,
            'count': 1
          });

        } else if (cssRules[i].declarations[j].property === 'color') {
          colors.push({
            'POS': colorPOS++,
            'COLOR': cssRules[i].declarations[j].value,
            'count': 1
          });
        } else if (cssRules[i].declarations[j].property === 'border-color') {
          border.push({
            'POS': borderPOS++,
            'COLOR': cssRules[i].declarations[j].value,
            'count': 1
          });
        }
      }

    }
    //console.log('fonts', border);
    //console.log('colors', colors);
    //console.log('backgrounds', backgrounds);


    this.props.dispatch(setColorData({
      'border': border,
      'colors': colors,
      'backgrounds': backgrounds,
    }));

  }




  render() {
    return null;
  }
}

const stateMap = (state) => {
  return {
    colorData: state.colorData
  };
};

export default connect(stateMap)(ParseCSS);
