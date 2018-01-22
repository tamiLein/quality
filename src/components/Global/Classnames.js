import React, {Component} from 'react';
import * as d3 from 'd3';

import json from './../../json/classnames.json'

class Classnames extends Component {

  constructor(props) {
    super(props);
  }

  render() {


    let items = new Array();
    let array = new Array();

    for (let i = 0; i < json.length; i++) {
      array[json[i].VALUE] = json[i].CLASS
    }

    array.forEach((item, index) => {
      items.push((
          <li key={index}><span className="classname index">[ {index} ]</span>    {item}</li>
      ))
    });


    if (items.length > 0) {

      console.log('items', items);
      return (
          items
      )
    }

    return null;
  }
}

export default Classnames;
