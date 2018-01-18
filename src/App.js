import React, {Component} from 'react';

//########## Components ##############
import Input from './components/Input';
import Accordion from './components/Accordion';

import './styles/App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
          <div id="inputForm">
            <Input/>
          </div>

          <Accordion/>

        </div>
    );
  }
}

export default App;
