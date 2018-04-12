import React, {Component} from 'react';
import {connect} from 'react-redux';


class Classnames extends Component {


  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.classNames;
    let items = [];

    for (let i = 0; i < data.length; i++) {
      items.push((
          <li key={i}><span className="classname index">[ {data[i].VALUE} ]</span> {data[i].CLASS}</li>
      ))
    }

    if (items.length > 0) {
      return (
          items
      )
    }

    return null;
  }
}

const stateMap = (state) => {
  return {
    classNames: state.classNames
  };
};

export default connect(stateMap)(Classnames);
