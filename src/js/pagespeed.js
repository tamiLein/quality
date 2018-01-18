var pagespeed = require("gpagespeed")

const options = {
  url: 'https://www.google.at/',
  key: 'AIzaSyDM0KzbxUNHlR4GYSIkdAV_S-b2JzTDhSk'
}

pagespeed(options)
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.error(error)
    })