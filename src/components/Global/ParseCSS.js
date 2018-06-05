import /*React, */ {Component} from 'react';
import {connect} from 'react-redux';
import cssparser from 'css';
import colorJs from 'color-js';

import {setColorData} from './../../redux/actions';


class ParseCSS extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      url: '',
    });
    this.parseCSS = this.parseCSS.bind(this);
    this.readCss = this.readCss.bind(this);

  }

  componentDidMount() {
    if (this.props.cssLinks !== '') {
      this.readCss();
    }
  }

  componentDidUpdate() {
    if (this.props.url !== this.state.url) {
      this.readCss();
    }
  }

  readCss() {
    this.setState({
      url: this.props.url,
    });

    let that = this;

    let css = '';

    for (let i = 0; i < this.props.cssLinks.length; i++) {
      let url = this.props.cssLinks[i].startsWith("//") ? this.props.cssLinks[i] : 'https://cors-anywhere.herokuapp.com/' + this.props.url + '' + this.props.cssLinks[i];
      if (url.includes('font') || url.includes('bootstrap') || url.includes('google')) {

      } else {

        const request = new XMLHttpRequest();

        request.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            css += this.responseText;
            that.parseCSS(css);
          }
          if (this.readyState === 4 && this.status === 200) {
            if (i === that.props.cssLinks.length - 1) {
              that.parseCSS(css);
            }
          }
        };
        request.open("GET", url, true);
        request.send();

      }
    }
  }


  parseCSS(css) {
    let backgrounds = [];
    let colors = [];
    let border = [];
    let cssObject = cssparser.parse(css, {silent: true});
    let cssRules = cssObject.stylesheet.rules;
    let color = '';
    let colorString = '';
    let index = '';

    for (let i = 0; i < cssRules.length; i++) {
      if (cssRules[i].declarations) {
        for (let j = 0; j < cssRules[i].declarations.length; j++) {

          if (cssRules[i].declarations[j].property === 'background-color' /*|| cssRules[i].declarations[j].property === 'background'*/) {
            //check if color exists
            color = colorJs(cssRules[i].declarations[j].value);
            colorString = color.toCSS();
            index = backgrounds.findIndex(element => element.COLOR === colorString);
            if (index >= 0) {
              backgrounds[index].count = backgrounds[index].count + 1;

            } else {
              backgrounds.push({
                'COLOR': colorString,
                'count': 1
              });
            }

          } else if (cssRules[i].declarations[j].property === 'color') {
            //check if color exists
            color = colorJs(cssRules[i].declarations[j].value);
            colorString = color.toCSS();
            index = colors.findIndex(element => element.COLOR === colorString);
            if (index >= 0) {
              colors[index].count = colors[index].count + 1;

            } else {
              colors.push({
                'COLOR': colorString,
                'count': 1
              });
            }
          } else if (cssRules[i].declarations[j].property === 'border-color') {
            //check if color exists
            color = colorJs(cssRules[i].declarations[j].value);
            colorString = color.toCSS();
            index = border.findIndex(element => element.COLOR === colorString);
            if (index >= 0) {
              border[index].count = border[index].count + 1;

            } else {
              border.push({
                'COLOR': colorString,
                'count': 1
              });
            }
          }
        }
      }

    }


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
    colorData: state.colorData,
    cssLinks: state.cssLinks,
    url: state.url,
  };
};

export default connect(stateMap)(ParseCSS);
