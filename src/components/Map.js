import React, {Component} from 'react';

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {

    render() {
        return (
            <div style={{height: '240px'}}>
                <Map google={this.props.google} zoom={14}
                     onClick={this.onMapClick}
                     className="map"
                     style={{height: '240px'}}
                >
                    <Marker onClick={this.onMarkerClick}
                            name={'Current location'} />

                    <InfoWindow onClose={this.onInfoWindowClose}>
                        <div>
                            aaa
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyC9oQFCYTvKxmzKeYjhpK1SB97Tr3sYsVE")
})(MapContainer)