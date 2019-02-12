import React, {Component} from 'react'
import {Marker, Popup} from 'react-leaflet';
import {Button} from 'semantic-ui-react';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

const currentLocationIcon = L.icon({
    iconUrl: icon,
    popupAnchor: [12.5, 0],
    shadowUrl: iconShadow
})

class Markers extends Component {

    render(){
        const {name, message, lng, lat, otherMessages } = this.props.userMessage;
        return (
            <Marker 
                icon={currentLocationIcon}
                position={[lat, lng]}>
                
                <Popup>
                    <Button color="blue" style={{padding: "5px"}}>{name}</Button> 
                    {message} 
                    
                    {otherMessages 
                        ? otherMessages.map( (otherMessage, index) =>
                        <p key={"otherMessage_"+index}> 
                            <Button  color="blue" style={{padding: "5px"}}>{otherMessage.name}</Button> 
                            {otherMessage.message}   
                        </p>
                        ) 
                        :""}
                </Popup>
            </Marker>
        )
    }
}

export default Markers;