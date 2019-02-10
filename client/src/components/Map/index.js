import React, {Component} from 'react';
import "./Map.css";

//Leaflet
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

//icon image
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import {saveMessage} from '../../actions/saveMessageActions';
import {connect} from 'react-redux';
import { Card, Button, Form, TextArea } from 'semantic-ui-react';


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
        userMessage: {
            name:'',
            message:''
        }
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

    formSubmit = (e)=> {
        e.preventDefault();
        //console.log(this.state.userMessage)
        const item = this.state.userMessage;

        this.props.dispatch(saveMessage(item));
    }

    valueChange = (e) => {
        const {name, value} = e.target;
        this.setState( (prevState) => ({
            userMessage : {
                ...prevState.location,
                ...prevState.userMessage,
                [name]: value
            }    
        }))
    }

    render() {
        const position = [this.state.location.lat, this.state.location.lng]
        return (
            <div className="map">

            <Map className="map" center={position} zoom={this.state.zoom}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            { this.state.haveUsersLocation ? 
                <Marker position={position}>
                    <Popup>
                        Hey I got you !
                    </Popup>
                    
                </Marker>
                : ""
            }
            </Map>
            <Card className="message-form">
                <Card.Content>
                    <Card.Header>Welcome to GuestMapp!</Card.Header>
                    <Card.Description>Leave a message with your location ! <br/>
                        Thanks for stopping by !
                    </Card.Description>
                    <br/>
                    <Form onSubmit={this.formSubmit}>
                        <Form.Field>
                            <label>Name</label>
                            <input 
                                onChange={this.valueChange} 
                                id="name" 
                                name="name" 
                                placeholder='Enter your name' 
                                type="text"
                                required />
                        </Form.Field>
                        <Form.Field>
                            <label>Message</label>
                            <TextArea
                                onChange={this.valueChange} 
                                id="message" 
                                name="message" 
                                placeholder='Enter your message'
                                required />
                        </Form.Field>
                        <Button type='submit' disabled={!this.state.haveUsersLocation}>Submit</Button>
                    </Form>
                </Card.Content>
            </Card>

            </div>
                    
        );
    }   
}


export default connect()(MapBox);