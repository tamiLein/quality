import React, {Component} from 'react';
import pagespeedValiator from 'gpagespeed';

class Pagespeed extends Component {
  constructor(props){
    super(props);
    this.state = {
      url: 'https://www.google.at/',
    }
  }

  validatePagespeed(url){
    const options = {
      url: url,
      key: 'AIzaSyDM0KzbxUNHlR4GYSIkdAV_S-b2JzTDhSk'
    };

    pagespeedValiator(options)
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          console.error(error)
        });
  }

  render() {
    this.validatePagespeed(this.state.url);


    return null;
  }
}

export default Pagespeed;
