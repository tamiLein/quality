import React, {Component} from 'react';
import htmlValiator from 'html-validator';
import {connect} from 'react-redux';

class HTML extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      error: '',
      showHideError: 'checked',
      showHideInfo: 'checked',
      errorcount: 0,
      warningcount: 0,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputChangeInfo = this.handleInputChangeInfo.bind(this);
    this.countErrors = this.countErrors.bind(this);
  }


  componentWillMount() {
    this.validateHTML(this.props.url);
  }


  validateHTML(url) {
    const options = {
      url: url,
      //validator: 'http://html5.validator.nu',
      format: 'json'
    };

    htmlValiator(options)
        .then((data) => {
          this.setState({
            data: data,
          });
          this.countErrors(data);
        })
        .catch((error) => {
          console.error(error);
          this.state.error = error;
        });
  }

  handleInputChange(event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState(
        {
          showHideError: value === true ? 'checked' : '',
        }
    );
  }

  handleInputChangeInfo(event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState(
        {
          showHideInfo: value === true ? 'checked' : '',
        }
    );
  }

  countErrors(data) {
    let counterError = 0;
    let counterWarning = 0;
    if (data !== '') {
      const error = data.messages;

      for (let i = 0; i < error.length; i++) {
        if (error[i].type === 'error') {
          counterError++;
        } else {
          counterWarning++;
        }
      }
      this.setState({
        errorcount: counterError,
        warningcount: counterWarning,
      })
    }
  }


  render() {

    let errorItems = [];

    if (this.state.data !== '') {
      //this.countErrors();
      const error = this.state.data.messages;

      //add filter options
      errorItems.push(
          <div className="col-md-12 error-filter" key="filter">
            <span>Filter result list:</span>
            <form>

              <input type="checkbox" id="error-checkbox" checked={this.state.showHideError}
                     onChange={this.handleInputChange}/>
              <label htmlFor="error-checkbox"><i className="fa error"></i>Errors ({this.state.errorcount})</label>

              <input type="checkbox" id="error-checkbox" checked={this.state.showHideInfo}
                     onChange={this.handleInputChangeInfo}/>
              <label htmlFor="info-checkbox">Warnings ({this.state.warningcount})</label>
            </form>
          </div>
      );


      //add warnings and errors

      for (let i = 0; i < error.length; i++) {
        let classChecked = '';
        if (error[i].type === 'error') {
          classChecked = this.state.showHideError;
        } else {
          classChecked = this.state.showHideInfo;
        }
        errorItems.push(
            <div className={'error col-md-12 ' + classChecked} key={i}>
              <div className="col-md-6">
                <span className="codeLine">In line: {error[i].lastLine}</span>
                <p className="codeSnipped">{error[i].extract}</p>
              </div>

              <div className="col-md-6">
                <span className={'errorType ' + error[i].type}><i className="fa"></i> {error[i].type}</span>
                <span className="errorMessage">{error[i].message}</span>

              </div>
            </div>
        )
      }
    }

    if (errorItems !== '') {
      return (errorItems);
    } else {
      return null;
    }
  }
}

const stateMap = (state) => {
  return {
    url: state.url
  };
};

export default connect(stateMap)(HTML);
