import React, {Component} from 'react';
import cssValiator from 'w3c-css';
import {connect} from 'react-redux';
import {setCSSChartdata as setCSSChartdata} from './../../redux/actions';


import CSSBarchart from './CSSBarchart';

class CSS extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: '',
      warnings: '',
      showHideError: 'checked',
      showHideInfo: 'checked',
      errorcount: 0,
      warningcount: 0,
      warningTypes: '',
      errorTypes: '',
      url: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputChangeInfo = this.handleInputChangeInfo.bind(this);
    this.generateDataForBarchart = this.generateDataForBarchart.bind(this);
  }

  componentWillMount() {
    this.validateCss(this.props.url);
  }


  componentDidUpdate() {
    if (this.state.url != this.props.url) {
      this.validateCss(this.props.url);
    }
  }


  validateCss(url) {
    cssValiator.validate(url, (err, data) => {
      if (err) {
        console.log('crashed', err);
      } else {
        // validation errors
        //console.log('css data', data);
        this.setState({
          errors: data.errors,
          errorcount: data.errors.length,
        });

        // validation warnings
        this.setState({
          warnings: data.warnings,
          warningcount: data.warnings.length,
          url: url,
        });
        this.generateDataForBarchart();

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

  generateDataForBarchart(){
    const error = this.state.errors;
    const warning = this.state.warnings;

    let errorTypes = {};
    let warningTypes = {};

    for (let i = 0; i < error.length; i++) {
      errorTypes[error[i].type] = errorTypes[error[i].type] ? errorTypes[error[i].type] + 1 : 1 ;
      if(i == error.length-1){
        this.setState({
          errorTypes: errorTypes,
        });
      }
    }


    for (let i = 0; i < warning.length; i++) {
      warningTypes[warning[i].type] = warningTypes[warning[i].type] ? warningTypes[warning[i].type] + 1 : 1 ;
      if(i == warning.length-1){
        //this.props.dispatch(setCSSChartdata(warningTypes));
        this.setState({
          warningTypes: warningTypes,
        });
      }
    }



  }


  render() {

    let errorItems = [];
    let warningItems = [];

    const error = this.state.errors;
    const warning = this.state.warnings;


    //add filter options
    errorItems.push(<div>
        <div className="col-md-12 error-filter" key="filter">
          <span>Filter result:</span>
          <form>

            <input type="checkbox" id="error-checkbox" checked={this.state.showHideError}
                   onChange={this.handleInputChange}/>
            <label htmlFor="error-checkbox"><i className="fa error"></i>Errors ({this.state.errorcount})</label>

            <input type="checkbox" id="error-checkbox" checked={this.state.showHideInfo}
                   onChange={this.handleInputChangeInfo}/>
            <label htmlFor="info-checkbox">Warnings ({this.state.warningcount})</label>
          </form>
        </div>
          <CSSBarchart warningTypes={this.state.warningTypes} errorTypes={this.state.errorTypes} warnings={this.state.showHideInfo} errors={this.state.showHideError}/>
      <h5>Error-List</h5>
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

const stateMap = (state) => {
  return {
    url: state.url
  };
};

export default connect(stateMap)(CSS);
