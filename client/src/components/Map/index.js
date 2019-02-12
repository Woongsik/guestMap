import React, {Component, createRef} from 'react';
import { Card, Button, Form, TextArea, Dimmer, Loader } from 'semantic-ui-react';
import "./Map.css";
import UserMarkers from '../Markers';
import OtherMenu from '../OtherMenu';

//Leaflet
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';

//icon image
import redIcon from 'leaflet/dist/images/userMarker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

//actions from dispatch
import {getMessage, saveMessage} from '../../actions/saveMessageActions';
import {connect} from 'react-redux';


let userIcon = L.icon({
    iconUrl: redIcon,
    popupAnchor: [12.5, 0],
    shadowUrl: iconShadow
});

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    popupAnchor: [12.5, 0]
});



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
        },
        isSubmitted: false,
        messageList: [],
        tempLocation:{
            lat: 0,
            lng: 0
        }
    }


    componentDidMount(){
        this.props.dispatch(getMessage())
        this.getCurrentLocation();
        this.setState({
            zoom: 13
        })
    }
    
    getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition( (position) => {
            this.setState({
                location:{
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                },
                haveUsersLocation: true
            })
        }, ()=>{ //when failed
            console.log('uh oh..they didnt give us their locaiton')
            fetch('https://ipapi.co/json')
                .then(res => res.json())
                .then( location => {
                    this.setState({
                        location:{
                            lat: location.latitude,
                            lng: location.longitude
                        },
                        haveUsersLocation: true
                    })
                })
        })
    }
    
    formSubmit = (e)=> {
        e.preventDefault();
        
        const item = this.state.userMessage;
        this.props.dispatch(saveMessage(item));
        this.setState({
            isSubmitted: true
        })
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

    mergeMessageInNearLocation = (messageList) => {
        const haveSeenLocation = {}
        messageList = messageList.reduce( (all, message)=>{
            const key = [message.lat.toFixed(2),message.lng.toFixed(2)];
            if(haveSeenLocation[key]){
                haveSeenLocation[key].otherMessages = haveSeenLocation[key].otherMessages || [];
                haveSeenLocation[key].otherMessages.push(message)
            }else{
                haveSeenLocation[key] = message;
                all.push(message);
            }
            return all;
        }, []);
        
        return messageList;
    }

    isMarkerMoved = (e) => {

        const location = e.target._latlng;
        //console.log(location)
        this.setState({
            location:{
                lat: location.lat,
                lng: location.lng
            }, 
            tempLocation:{
                lat: location.lat,
                lng: location.lng
            }   
        })
    }

    handleZoom = (e)=>{
        const zoom = e.target._zoom;
        this.setState({
            zoom:zoom
        })
    }
    
    popUpOpen = ref => {
        if (ref) {
          ref.leafletElement.openPopup()
        }
      }

    addControl = ref => {
        const provider = new OpenStreetMapProvider()
        const searchControl = new GeoSearchControl({
            provider: provider,
            style:'bar',
            showMarker: false,

        })
        //console.log(ref)
        
        if(ref){  //map on 
            ref.leafletElement.addControl(searchControl)
            ref.leafletElement.on('geosearch/showlocation', function(e) {
                this.setTempLocation(e.location);
            }.bind(this));
        }
    }

    setThisLocation = () => {
        this.setState({
            location: this.state.tempLocation
        })
    }
    
    setTempLocation = (location) => {
        //console.log("tempLocationInThis"+location)
        this.setState({
            tempLocation:{
                lat: (location.y),
                lng: (location.x),
            }
        })
           
    }
    
    
    
    
    
    render() {
        //console.log("location: "+JSON.stringify(this.state.location))
        //console.log("tempLocation: "+JSON.stringify(this.state.tempLocation))
        const position = [this.state.location.lat, this.state.location.lng]
        const loader = (<Dimmer active>
                        <Loader />
                        </Dimmer>)        
        let userMarkers = "";
        if( (this.props.messageList).length > 0){
            let newMessageList = this.mergeMessageInNearLocation(this.props.messageList)
            
            userMarkers = newMessageList.map( (message, index) => {
                return (
                <UserMarkers key={"userMarker_"+index} userMessage={message}/>)
            })
        }



        return (

        ( this.props.isLoading 
        ? loader 
        : <div className="map">

            <Map className="map" 
                center={position} 
                zoom={this.state.zoom}
                maxZoom={18}
                onZoomend={this.handleZoom}
                ref={this.addControl}
                >
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                 
                {userMarkers}

            { this.state.haveUsersLocation && !this.state.isSubmitted 
            ? 
                <Marker
                    icon={userIcon} 
                    position={position}
                    ref={this.popUpOpen}
                    draggable={true}
                    onDragend={this.isMarkerMoved}
                    >
                    <Popup>
                        <Button color="red" style={{padding: "5px"}}>Hello! You are here!</Button> 
                    </Popup>
                </Marker>
            :   <Marker
                    icon={userIcon} 
                    position={position}
                    ref={this.popUpOpen}>
                    <Popup>
                        <Button color="blue" style={{padding: "5px"}}>{this.state.userMessage.name}</Button> 
                        {this.state.userMessage.message}
                    </Popup>
                </Marker>
            }
            
            </Map>

            <Card className="message-form">
                <Card.Content>
                    <Card.Header style={{textAlign:"center"}}>Welcome to GuestMapp!</Card.Header>
                    <Card.Description>Leave a message with your location ! <br/>
                        Thanks for stopping by !
                    </Card.Description>
                    <br/>
                    {this.state.isSubmitted ? "Thanks for the message and support !" : 
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
                        <Button style={{float:"right"}} type='submit' disabled={!this.state.haveUsersLocation}>Submit</Button>
                    </Form>}
                </Card.Content>
            </Card>
            {this.state.isSubmitted ? "": 
            <OtherMenu onCurrentLocation={this.getCurrentLocation} onMoveToAddressFromList={this.setThisLocation}/>}
            </div>)
                    
        );
    }   
}



const mapStateToProps = (state)=> ({
    isLoading: state.getMessage.loading,
    messageList: state.getMessage.item
})

export default connect(mapStateToProps)(MapBox);