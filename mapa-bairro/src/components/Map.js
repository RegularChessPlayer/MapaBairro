import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapComponent extends Component {

    render() {
        const {onMarkerClick, onClose} = this.props

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
                    bounds={this.props.bounds}
                    className={'map'}
                    onClick={onClose}
                    zoom={16}>
                {this.props.placesToDisplay.map((markerInfo, index) =>
                <Marker
                    ref={markerInfo.title}
                    position={{lat: markerInfo.location.lat, lng: markerInfo.location.lng}}
                    key={index}
                    title={markerInfo.title}
                    onClick={ onMarkerClick }
                    onMouseout={this.mouseMoveOutOfMarker}
                />
                )}
                <InfoWindow
                    marker={this.props.activeMarker}
                    onClose={ onClose }
                    visible={this.props.infoWindowVisible} >
                        <div
                        className="info-window-content"
                        aria-label={`InfoWindow on ${this.props.activeMarker.title}`}
                        >
                        <h2 tabIndex="0" style={{textAlign:'center'}}>
                        {this.props.activeMarker.title}
                        </h2>
                        {this.props.photo ==='Loading photo' ?
                            <h3  tabIndex="0" style={{textAlign:'center'}}>Loading photo</h3> :
                            this.props.photo ==='error' ?
                            <h3  tabIndex="0" style={{textAlign:'center'}}>Photo could not load</h3> :
                            <div style={{textAlign:'center'}}>
                            <img  tabIndex="0"   src={this.props.photo}   alt={this.props.activeMarker.title + ' photo'}/>
                            </div>}
                        <h3 tabIndex="0"  style={{textAlign:'center'}}>{this.props.likes}</h3>
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
