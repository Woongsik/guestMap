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
    popupAnchor: [12.5, 0],
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

class MapBox extends Component {
    
    state = {
        location: {//default Helsinki
            lat: 60.16734721573472,
            lng: 24.94248390197754
        },
        haveUsersLocation: false,
        zoom: 2,
    }

    componentDidMount(){
        navigator.geolocation.getCurrentPosition( (position) => {
            this.setState({
                location:{
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                },
                haveUsersLocation: true,
                zoom: 13
            })
        }, ()=>{ //when failed
            console.log('uh oh..they didnt give us their locaiton')
            fetch('https://ipapi.co/json')
                .then(res => res.json())
                .then( location => {
                    console.log(location);
                    this.setState({
                        location:{
                            lat: location.latitude,
                            lng: location.longitude
                        },
                        haveUsersLocation: true,
                        zoom: 13
                    })
                })
        })
    }

    render() {
        const position = [this.state.location.lat, this.state.location.lng]
        return (
            
            <Map className="map" center={position} zoom={this.state.zoom}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                { this.state.haveUsersLocation ? 
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>: ""
                }

            </Map>
                    
                    

            
        );
    }   
}


export default MapBox;