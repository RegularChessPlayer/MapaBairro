import React, { Component } from 'react';
import './App.css';
import Search from './components/Search.js';
import MapComponent from './components/Map.js'

import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as fourSquareAPI from './components/Apis/fourSquareAPI.js';

//Handling when  Google's API have any Problem on the request
document.addEventListener("DOMContentLoaded", function(e) {
  let scriptTag = document.getElementsByTagName('SCRIPT').item(1);
  scriptTag.onerror = function(e) {
    console.log('Ops! We cant access Google Maps API for now!')
    let mapContainerElemt = document.querySelector('#root');
    let erroElement = document.createElement('div');
    erroElement.innerHTML = '<div class="error-msg">Ops! We cant access Google Maps API for now! </div>'
    mapContainerElemt.appendChild(erroElement)
  }
})

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      places: [{title: 'Colégio José de Alencar', location: {lat: -3.7196521, lng: -38.5854607}},
      {title: 'Colégio Dom Quintino', location: {lat: -3.724317, lng: -38.589272}},
      {title: 'Mercado CenterBox', location: {lat: -3.7174681, lng: -38.5811995}},
      {title: 'Farmacia 1', location: {lat: -3.7207799, lng: -38.58343}},
      {title: 'Farmacia A', location: {lat: -3.7207799, lng: -38.58500}}],
      query:'',
      infoWindowVisible: false,
      likes: '',
      photo: '',
      activeMarker: {}  
    }
    
    this.updateQuery = this.updateQuery.bind(this);
    this.clearQuery = this.clearQuery.bind(this);
    this.onclose = this.onclose.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.moreInfo = this.moreInfo.bind(this);
  }

  moreInfo = (place) => {
    console.log(place)
    
    this.setState({
      activeMarker: place,
      infoWindowVisible: true,
      likes: 'Loading likes',
      photo: 'Loading photo'
      });
      this.getFourSquareInfo(place.location.lat, place.location.lng, place.title)
  }

  onMarkerClick = (markerProperties, markerReference) =>{
    this.setState({
    activeMarker: markerReference,
    infoWindowVisible: true,
    likes: 'Loading likes',
    photo: 'Loading photo'
    });
    this.getFourSquareInfo(markerProperties.position.lat, markerProperties.position.lng,markerProperties.title)
  }

//Get information via squarespace API
  getFourSquareInfo = (lat,lng,name) => {
    return fourSquareAPI.getSearchResult(lat, lng, name).then(venueId => {
    //If 'getSearchResult' API call returns an error
    if(venueId ==='error' )
        this.setState({
        likes: 'Error loading Content',
        photo: 'error'
    });
    else {
        //If 'getDetails' API call returns an error
        fourSquareAPI.getDetails(venueId).then(response => {
        if(response === 'error' || response.meta.code !== 200)
            this.setState({
            likes: 'Error loading content',
            photo: 'error'
            });
        else{
            if('likes' in response.response.venue)
            this.setState({likes: response.response.venue.likes.summary});
            else
            this.setState({likes: 'Error loading content'});
            if('bestPhoto' in response.response.venue)
            this.setState({photo: response.response.venue.bestPhoto.prefix+'150'+response.response.venue.bestPhoto.suffix});
            else
            this.setState({photo:'error'});
        }
        })
    }
    })
  }

  updateQuery = (query) => {
        this.setState({query: query.trim()})
  }

  clearQuery = () => {
        this.setState({ query: '' })
  }

  onclose = () => {this.setState({activeMarker: {},infoWindowVisible: false})}

  render() {
    let showingPlaces
    if(this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      showingPlaces = this.state.places.filter((place) => match.test(place.title))
    } else {
      showingPlaces = this.state.places
    }

    showingPlaces.sort(sortBy('title'))
    let isShowAll = showingPlaces.length !== this.state.places.length 
    
    return (
      <div className="App">
        <Search showingPlaces={showingPlaces} updateQuery={this.updateQuery} clearQuery={this.clearQuery}
                isShowAll = {isShowAll} totalPlaces={this.state.places.length} moreInfo={this.moreInfo}/>
        <MapComponent placesToDisplay={showingPlaces} onclose={this.onclose} 
                      onMarkerClick={this.onMarkerClick} infoWindowVisible={this.state.infoWindowVisible} 
                      likes={this.state.likes} photo={this.state.photo} activeMarker={this.state.activeMarker}/>
      </div>
    );
  }
}

export default App;