import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//########## Components ##############
import Input from './components/Input';
import Accordion from './components/Accordion';



import './styles/App.css';

class App extends Component {

  constructor(props) {
    super(props);

  }

  static propTypes = {
    url: PropTypes.string,
  };

  componentWillMount() {
    console.log('store test', this.props.url);
  }

  render() {
    const body = document.getElementsByTagName('body');
    console.log('body', body);
    console.log('body', body[0].className);

    if(this.props.url !== '') {
      body[0].removeAttribute("class", "no-url");
      return (
          <div className="App">
            <div id="inputForm">
              <Input/>
            </div>
            <div id="info">
              <p>Here are the results for the given page: <br/> <a href={this.props.url} target="_blanc">{this.props.url}</a> </p>
            </div>
            <Accordion/>

          </div>
      );
    }else{

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
  console.log('state', state);
  return {
    url: state.url
  };
};

export default connect(stateMap)(App);
