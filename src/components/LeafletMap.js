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
        this.state = {
            currentPos: [58.377916, 26.729050],
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
        });
        this.handleCoordinateChange();
    }

    render() {
        return (
            <Map center={[58.387916, 26.729050]} zoom={11} onClick={this.handleClick}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={this.state.currentPos}>
                    <Popup>
                        Hetkel valitud asukoht! <br/> Vajuta kaardile, et asukohta muuta.
                    </Popup>
                </Marker>
            </Map>
        )
    }
}

export default LeafletMap;