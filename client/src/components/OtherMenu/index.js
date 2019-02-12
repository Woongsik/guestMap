import React from 'react';
import {Card, Button } from 'semantic-ui-react';

class OtherMenu extends React.Component {
    render(){
        return (

            <Card className="message-menu">
                <Card.Content>
                    <Card.Header style={{textAlign:"center"}}>OtherOptions</Card.Header>
                    <Card.Description style={{textAlign:"center"}}>
                        <Button color="yellow" size="small" style={{width:"100%", margin: "10px 0"}} onClick={this.props.onCurrentLocation}>Get my location back</Button>
                        <Button color="purple" size="small" style={{width:"100%", margin: "10px 0"}}onClick={this.props.onMoveToAddressFromList}>Set this location</Button>  
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}

export default OtherMenu;