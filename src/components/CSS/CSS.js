import React, {Component} from 'react';
import cssValiator from 'w3c-css';

class CSS extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: 'https://www.google.at/',
      errors: '',
      warnings: '',
      showHideError: 'checked',
      showHideInfo: 'checked',
      errorcount: 0,
      warningcount: 0,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputChangeInfo = this.handleInputChangeInfo.bind(this);
  }

  componentWillMount() {
    this.validateCss(this.state.url);
  }


  validateCss(url) {
    cssValiator.validate(this.state.url, (err, data) => {
      if (err) {
        console.log('crashed', err);
      } else {
        // validation errors
        this.setState({
          errors: data.errors,
          errorcount: data.errors.length,
        });

        // validation warnings
        this.setState({
          warnings: data.warnings,
          warningcount: data.warnings.length,
        });
      }
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


  render() {

    console.log('render css');

    let errorItems = [];
    let warningItems = [];

    const error = this.state.errors;
    const warning = this.state.warnings;

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


    // add errors
    for (let i = 0; i < error.length; i++) {
      errorItems.push(
          <div className={'error col-md-12 ' + this.state.showHideError} key={i}>
            <div className="col-md-6">
              <span className="codeLine">In line: {error[i].line}</span>
              <p className="codeSnipped">Used value: {error[i].skippedString}</p>
            </div>

            <div className="col-md-6">
              <span className={'errorType error'}><i className="fa"></i> {error[i].type}</span>
              <span className="errorMessage">{error[i].message}</span>

            </div>
          </div>
      )
    }


    // add warnings
    for (let i = 0; i < warning.length; i++) {
      warningItems.push(
          <div className={'error col-md-12 ' + this.state.showHideInfo} key={i}>
            <div className="col-md-6">
              <span className="codeLine">In line: {warning[i].line}</span>
              <p className="codeSnipped">Used value: {warning[i].skippedString}</p>
            </div>

            <div className="col-md-6">
              <span className={'errorType info'}><i className="fa"></i> {warning[i].type}</span>
              <span className="errorMessage">{warning[i].message}</span>

            </div>
          </div>
      )
    }

    if (errorItems !== '' && warningItems !== '') {
      errorItems.push(warningItems);
      return (errorItems);
    } else if (errorItems !== '') {
      return (errorItems);
    } else if (warningItems !== '') {
      return (warningItems);
    } else {
      return null;
    }


  }
}

export default CSS;
