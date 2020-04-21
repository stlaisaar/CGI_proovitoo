import React, {Component} from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "./WorldMap.css";

/* Markeri mitte kuvamise fix: https://github.com/PaulLeCam/react-leaflet/issues/453 */
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

/* Kaardi tööle saamine: https://youtu.be/DZfvr2zguHo */
class WorldMap extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            currentCoordinates: this.props.latlng,
            mapKeyValue: this.props.mapKeyValue,
            zoomLevel: 6,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleCoordinateChange = () => {
        let newCoordinates = this.state.currentCoordinates;
        this.props.onCoordinatesChange(newCoordinates);
    };

    /* Asukoha saamine: https://stackoverflow.com/questions/54503275/react-leaflet-get-current-latlng-onclick */
    handleClick(e) {
        let newCoordinates = e.latlng;
        this.setState({
            currentCoordinates: newCoordinates,
            zoomLevel: this.map.leafletElement.getZoom(),
        });
        this.handleCoordinateChange();
    }

    render() {
        return (
            <Map
                ref={(ref) => { this.map = ref; }}
                 center={this.state.currentCoordinates}
                 zoom={this.state.zoomLevel}
                 onClick={this.handleClick}
                 key={this.state.mapKeyValue}
                 maxBounds={[[-90, -180], [90, 180]]}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={this.state.currentCoordinates}>
                    <Popup>
                        Valitud asukoht:<br/>
                        Lat: {this.state.currentCoordinates['lat']}<br/>
                        Lng: {this.state.currentCoordinates['lng']}
                    </Popup>
                </Marker>
            </Map>
        )
    }
}

export default WorldMap;