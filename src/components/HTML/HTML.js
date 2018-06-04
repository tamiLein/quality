import React, {Component} from 'react';
import htmlValiator from 'html-validator';
import stringSimilarity from 'string-similarity';
import {connect} from 'react-redux';

import HTMLBarchart from './HTMLBarchart';

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
      warningTypes: '',
      errorTypes: '',
      url: '',
      errors: '',
      warnings: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputChangeInfo = this.handleInputChangeInfo.bind(this);
    this.countErrors = this.countErrors.bind(this);
    this.generateDataForBarchart = this.generateDataForBarchart.bind(this);

  }


  componentWillMount() {
    this.validateHTML(this.props.url);
  }

  componentDidUpdate() {
    if (this.state.url !== this.props.url) {
      this.validateHTML(this.props.url);
    }
  }

  validateHTML(url) {
    const options = {
      url: url,
      //validator: 'http://html5.validator.nu',
      format: 'json',
      verbose: true,
    };

    htmlValiator(options)
        .then((data) => {
          this.setState({
            data: data,
            url: this.props.url,
          });
          this.countErrors(data);
        })
        .then(() => this.generateDataForBarchart())
        .catch((error) => {
          this.setState({
            error: error,
          });
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
    let errors = [];
    let warnings = [];
    if (data !== '') {
      const error = data.messages;

      for (let i = 0; i < error.length; i++) {
        if (error[i].type === 'error') {
          counterError++;
          errors.push(error[i]);
        } else {
          counterWarning++;
          warnings.push(error[i]);
        }
      }
      this.setState({
        errorcount: counterError,
        warningcount: counterWarning,
        errors: errors,
        warnings: warnings,
      })
    }
  }

  generateDataForBarchart() {
    const errors = this.state.errors;
    const warnings = this.state.warnings;

    let errorTypes = {};
    let warningTypes = {};

    let currentErrorMessage = '';
    let found = false;

    for (let i = 0; i < errors.length; i++) {
      currentErrorMessage = errors[i].message;
      for (let index in errorTypes) {
        if (stringSimilarity.compareTwoStrings(currentErrorMessage, index) === 1) {
          errorTypes[index] = errorTypes[index] + 1;
          found = true;
        }
      }
      if (!found) errorTypes[currentErrorMessage] = 1;

      found = false;

      if (i === errors.length - 1) {
        this.setState({
          errorTypes: errorTypes,
        });
      }
    }

    found = false;
    for (let i = 0; i < warnings.length; i++) {
      currentErrorMessage = warnings[i].message;
      for (let index in warningTypes) {
        if (stringSimilarity.compareTwoStrings(currentErrorMessage, index) === 1) {
          warningTypes[index] = warningTypes[index] + 1;
          found = true;
        }
      }
      if (!found) warningTypes[currentErrorMessage] = 1;

      found = false;

      if (i === warnings.length - 1) {
        this.setState({
          warningTypes: warningTypes,
        });
      }
    }


  }


  render() {

    let errorItems = [];

    if (this.state.data !== '') {
      //this.countErrors();
      const error = this.state.data.messages;

      //add filter options
      errorItems.push(
          <div key="filter">
            <div className="col-md-12 error-filter">
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
            <HTMLBarchart warningTypes={this.state.warningTypes} errorTypes={this.state.errorTypes}
                          warnings={this.state.showHideInfo} errors={this.state.showHideError}/>
            <h5>Error-List</h5>
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
