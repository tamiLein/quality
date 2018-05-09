import React, {Component} from 'react';
import {connect} from 'react-redux';


class Classnames extends Component {


  constructor(props) {
    super(props);
  }

  mouseover(event){
    //console.log(event);
    /*let elements = document.getElementsByClassName('class-' + classname);
    if(elements.length > 0) {
      elements[0].classList.add('active');
      elements[1].classList.add('active');
    }*/
  }

  mouseout(event){
    /*let elements = document.getElementsByClassName('class-' + classname);
   if(elements.length > 0) {
      elements[0].classList.remove('active');
      elements[1].classList.remove('active');
    }*/

  }

  render() {
    let data = [...this.props.classNames];

    if(data !== '') {
      data.sort((a, b) => a.VALUE > b.VALUE);
    }

    let items = [];



    for (let i = 0; i < data.length; i++) {
      items.push((
          <li key={i} className={'class-' + data[i].CLASS} onMouseOver={this.mouseover} onMouseOut={this.mouseout}><span className="classname index">[ {data[i].VALUE} ]</span> {data[i].CLASS}</li>
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
