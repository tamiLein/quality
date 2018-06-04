import React, {Component} from 'react';
import {connect} from 'react-redux';

import {setUrl as setUrlAction} from './../redux/actions';

import '../styles/App.css';


class Input extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }


  handleChange(event) {
    this.setState({
      url: event.target.value,
    })
  }

  checkUrl(url) {
    const pattern = /^((http|https|ftp):\/\/)/;

    if (!pattern.test(url)) {
      url = "http://" + url;
    }
    return url;

  }

  handleClick(event) {
    event.preventDefault();

    let newURL = this.checkUrl(this.state.url);
    this.props.dispatch(setUrlAction(newURL));
  }

  render() {
    return (
        <div className="container">
          <form>
            <label htmlFor="addressInput" className="screen-reader-text">URL</label>
            <input type="text" id="addressInput" onChange={this.handleChange} placeholder="Please enter your URL ..."/>
            <button className="btn btn-default" onClick={this.handleClick}><span
                className="screen-reader-text">Submit</span></button>
          </form>
        </div>
    );
  }
}

const stateMap = (state) => {
  return {
    url: state.url
  };
};

export default connect(stateMap)(Input);
