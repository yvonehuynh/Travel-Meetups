import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Qs from 'qs';
import MeetupInfo from './meetup-info';
import LandingPage from './landing-page';

class App extends React.Component {
  constructor() {
    super();
    
    this.getMeetups = this.getMeetups.bind(this);
    this.state = {
      meetups: [],
      longitude: '',
      latitude: ''
    }
  }

  //instead of the componentDidMount, the getMeetups function will take the user values
  //passing in city, country, category args to use as params(placeholders)
 
  getMeetups(city, country, category) {
    axios({
      method: 'GET',
      url: 'http://proxy.hackeryou.com',
      dataResponse: 'json',
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
      },
      params: {
        reqUrl: 'https://api.meetup.com/2/open_events',
        params: {
          key: '6a49717012332a5d284f3c775460653',
          city: city,
          country: country,
          category: category,
        },
        proxyHeaders: {
          'header_params': 'value'
        },
        xmlToJSON: false
      }
    }).then((res) => {
      const meetups = res.data.results.filter(meetup => meetup.venue !== undefined);
    
      
      this.setState({
        meetups
        
      })
    
    });
  }

  //method to get restaurant location by google places API request
  getRes(longitude, latitude) {
    
    axios({
      method: 'GET',
      url: 'http://proxy.hackeryou.com',
      dataResponse: 'json',
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
      },
      params: {
        reqUrl: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
        params: {
          key: 'AIzaSyCpT2X1_HiFf3PJxmbYeIPpSIHGrdUTnmM',
          type: 'restaurant',
          location: longitude,latitude,
          radius: 1000,
        },
        proxyHeaders: {
          'header_params': 'value'
        },
        xmlToJSON: false
      }
    }).then((result) => {
      console.log(result)
      
    })
  }
 
  render() {
    return (
      <div>
        <LandingPage formSubmit={this.getMeetups} />
        {this.state.meetups.map((meetup, i) => {
<<<<<<< HEAD
          return <MeetupInfo key={`meetup-${i}`} data={meetup} lat={meetup.venue.lat} lon={meetup.venue.lon} />
=======
          return <MeetupInfo key={`meetup-${i}`} data={meetup} lat={meetup.venue.lat} lon={meetup.venue.lon}/>
         
>>>>>>> b25acd37e8899c3fc96d6ad298db8d4f0efc802f
        })}
      </div>
    )
  } 
}

//comment
ReactDOM.render(<App />, document.getElementById('app'));