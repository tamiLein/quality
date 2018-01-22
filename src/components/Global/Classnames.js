import React, {Component} from 'react';

import json from './../../json/classnames.json'

class Classnames extends Component {

  render() {

    let items = [];
    let array = [];

    for (let i = 0; i < json.length; i++) {
      array[json[i].VALUE] = json[i].CLASS
    }

    array.forEach((item, index) => {
      items.push((
          <li key={index}><span className="classname index">[ {index} ]</span> {item}</li>
      ))
    });


    if (items.length > 0) {
      return (
          items
      )
    }

    return null;
  }
}

export default Classnames;
