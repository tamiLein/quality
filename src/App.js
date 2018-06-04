import React, {Component} from 'react';
import {connect} from 'react-redux';

//########## Components ##############
import Input from './components/Input';
import Accordion from './components/Accordion';


import './styles/App.css';

class App extends Component {

  componentWillMount() {

  }

  render() {
    const body = document.getElementsByTagName('body');


    if (this.props.url !== '') {
      body[0].removeAttribute("class", "no-url");
      return (
          <div className="App">
            <div id="inputForm">
              <Input/>
            </div>
            <div id="info">
              <p>Here are the results for the given page: <br/> <a href={this.props.url}
                                                                   target="_blanc">{this.props.url}</a></p>
            </div>
            <Accordion/>

          </div>
      );
    } else {

      body[0].setAttribute("class", "no-url");

      return (
          <div className="App no-url">
            <div id="inputForm">
              <Input/>
            </div>

          </div>
      );
    }
  }
}

const stateMap = (state) => {
  return {
    url: state.url
  };
};

export default connect(stateMap)(App);
