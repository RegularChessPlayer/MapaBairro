import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import * as fourSquareAPI from './Apis/fourSquareAPI.js';

class MapComponent extends Component {

    state = {
        infoWindowVisible: false,
        likes: '',
        photo: '',
        activeMarker: {}  
      }

    //Set the bounds upon mounting component
    componentDidMount(){

    }

    //Used to open the infoWindow and load information from square space
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

    render() {
        if (!this.props.loaded) {
          return <div>Loading...</div>
        }
        return (
            <div>
                <Map google={this.props.google}
                    initialCenter={{
                        lat: -3.7225419,
                        lng: -38.584907
                    }}
                    bounds={this.state.bounds}
                    className={'map'}
                    onClick={() => {this.setState({activeMarker: {},infoWindowVisible: false})}}
                    zoom={16}>
                {this.props.placesToDisplay.map((markerInfo, index) =>
                <Marker
                    ref={markerInfo.title}
                    position={{lat: markerInfo.location.lat, lng: markerInfo.location.lng}}
                    key={index}
                    title={markerInfo.title}
                    onClick={this.onMarkerClick}
                    onMouseout={this.mouseMoveOutOfMarker}
                />
                )}
                <InfoWindow
                    marker={this.state.activeMarker}
                    onClose={() => this.setState({activeMarker: {}, infoWindowVisible: false})}
                    visible={this.state.infoWindowVisible} >
                        <div
                        className="info-window-content"
                        aria-label={`InfoWindow on ${this.state.activeMarker.title}`}
                        >
                        <h2 tabIndex="0" style={{textAlign:'center'}}>
                        {this.state.activeMarker.title}
                        </h2>
                        {this.state.photo ==='Loading photo' ?
                            <h3  tabIndex="0" style={{textAlign:'center'}}>Loading photo</h3> :
                            this.state.photo ==='error' ?
                            <h3  tabIndex="0" style={{textAlign:'center'}}>Photo could not load</h3> :
                            <div style={{textAlign:'center'}}>
                            <img  tabIndex="0"   src={this.state.photo}   alt={this.state.activeMarker.title + ' photo'}/>
                            </div>}
                        <h3 tabIndex="0"  style={{textAlign:'center'}}>{this.state.likes}</h3>
                        </div>
                </InfoWindow>
                </Map>    
            </div>     
        )
      }
 };

 export default GoogleApiWrapper({
    apiKey: 'AIzaSyAQS10y-Xb75NLYdLmuVzjU2wC9KWCrJNM'
  })(MapComponent)

  MapComponent.propTypes = {
    placesToDisplay: PropTypes.array.isRequired,
  }
