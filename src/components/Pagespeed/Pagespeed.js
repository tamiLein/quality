import React, {Component} from 'react';
//import valiator from 'gpagespeed';

const validator = require('gpagespeed')

class Pagespeed extends Component {
  constructor(props){
    super(props);
    this.state = {
      url: 'https://www.google.at/',
    }
    this.validatePagespeed = this.validatePagespeed.bind(this);
  }

  componentDidMount(){
    this.validatePagespeed();
  }

  componentDidUpdate(){
    this.validatePagespeed();
  }

  validatePagespeed(url){

    const options = {
      url: url,
      key: 'AIzaSyDM0KzbxUNHlR4GYSIkdAV_S-b2JzTDhSk'
    };

    /*valiator(options)
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          console.error(error)
        });*/
  }

  render() {
    //this.validatePagespeed(this.state.url);


    return null;
  }
}

export default Pagespeed;
