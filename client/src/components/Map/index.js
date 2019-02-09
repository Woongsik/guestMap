import React, {Component} from 'react';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import '../../../node_modules/leaflet/dist/leaflet.css';
import "./Map.css";

//icon image
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

class MapBox extends Component {
    
    state = {
        lat: 60.16734721573472,
        lng: 24.94248390197754,
        zoom: 13,
    }

    componentDidMount(){
        navigator.geolocation.getCurrentPosition( function(position) {
            console.log(position);
          });
    }

    render() {
        const position = [this.state.lat, this.state.lng]
        return (
            
            <Map className="map" center={position} zoom={this.state.zoom}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </Map>
                    
                    

            
        );
    }   
}


export default MapBox;