//########## npm ##############
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider }  from 'react-redux';
import store from './redux/store';

//########## Styles ##############
import './styles/index.css';

//########## JS ##############
//import './js/pagespeed';

//########## Components ##############
import App from './App';
import Footer from './components/Footer';
import Header from './components/Header';
//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<div><Provider store={store}><App /></Provider></div>, document.getElementById('root'));
ReactDOM.render(<Footer/>, document.getElementById('footer'));
/*registerServiceWorker();*/
