import React, {Component} from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "./LeafletMap.css";

/* Markeri mitte kuvamise fix: https://github.com/PaulLeCam/react-leaflet/issues/453 */
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

/* Kaardi tööle saamine: https://youtu.be/DZfvr2zguHo */
class LeafletMap extends Component  {
    constructor(props) {
        super(props);
        let mapKeyVal = this.props.mapKeyValue;
        this.state = {
            currentPos: this.props.latlng,
            mapKeyValue: mapKeyVal,
            zoom: 6,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleCoordinateChange = () => {
        let newCoordinates = this.state.currentPos;
        this.props.onCoordinatesChange(newCoordinates);
    };

    /* Asukoha saamine: https://stackoverflow.com/questions/54503275/react-leaflet-get-current-latlng-onclick */
    handleClick(e) {
        let newCoordinates = e.latlng;
        this.setState({
            currentPos: newCoordinates,
            zoom: this.map.leafletElement.getZoom(),
        });
        this.handleCoordinateChange();
    }

    render() {
        return (
            <Map ref={(ref) => { this.map = ref; }}
                 center={this.state.currentPos}
                 zoom={this.state.zoom}
                 onClick={this.handleClick}
                 key={this.state.mapKeyValue}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={this.state.currentPos}>
                    <Popup>
                        Valitud asukoht:<br/>
                        Lat: {this.state.currentPos['lat']}<br/>
                        Lng: {this.state.currentPos['lng']}
                    </Popup>
                </Marker>
            </Map>
        )
    }
}

export default LeafletMap;