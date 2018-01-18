import React, {Component} from 'react';
import '../styles/App.css';


class Input extends Component {
  render() {
    return (
        <div className="container">
          <form>
              <label htmlFor="addressInput" className="screen-reader-text">URL</label>
              <input type="text" id="addressInput" placeholder="Please enter your URL ..." />
            <button type="submit" className="btn btn-default"><span className="screen-reader-text">Submit</span></button>
          </form>

          <div id="info">
            <p>Here are the results for the given page:</p>
          </div>
        </div>
    );
  }
}

export default Input;
