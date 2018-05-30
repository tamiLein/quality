import React, {Component} from 'react';
import {connect} from 'react-redux';


class Classnames extends Component {


  constructor(props) {
    super(props);
    this.state = {
      'bubbleArray' : '',
      'selected': '',
    };
    this.mouseover = this.mouseover.bind(this);
    this.mouseout = this.mouseout.bind(this);
  }

  componentDidUpdate(){
    if(this.state.bubbleArray == '') {

      let bubbles = document.getElementById('bubbleChart');

      let bubblesList = bubbles.childNodes[0].childNodes;

      let bubbleArray = [];
      for (let i = 0; i < bubblesList.length; i++) {
        bubbleArray[i] = bubblesList[i].childNodes[0];
      }
      this.setState({
        'bubbleArray': bubbleArray,
      });
    }
  }

  mouseover(event){
    let classname = event.target.className;
    let array = this.state.bubbleArray;

    let selected = null;
    for (let i = 0; i < array.length; i++){
      if(array[i].className.baseVal == classname){
        selected = array[i];
        selected.classList.add('active');
        this.setState({
          'selected': selected,
        });
        i = array.length;
      }
    }
  }



  mouseout(event){
    this.state.selected.classList.remove('active');
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
