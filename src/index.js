//########## npm ##############
import React from 'react';
import ReactDOM from 'react-dom';

//########## Styles ##############
import './styles/index.css';

//########## JS ##############
//import './js/pagespeed';

//########## Components ##############
import App from './App';
import Footer from './components/Footer';
import Header from './components/Header';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Footer/>, document.getElementById('footer'));
registerServiceWorker();
