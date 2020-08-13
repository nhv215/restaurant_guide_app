import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
	width: '100%',
	height: '100%'
};

export class MapContainer extends Component {
	constructor(props) {
		super();
		this.state = {
			showInfoWindow: false,
        	activeMarker: {},
        	activeMarkerProps: {}
		};
	}
	onClickMarker = (props, marker, e) => {
		debugger;
        this.setState({ showInfoWindow: true, activeMarker: marker, activeMarkerProps: props}) 
	}
	
	onInfoWindowClose = () => {
		debugger;
		this.setState({ activeMarker: {}, showingInfoWindow: false, activeMarkerProps: {} });
	}
    
	
	render() {
		let { activeMarker, activeMarkerProps} = this.state;
		const currentLocation = this.props.list[0].location;
		var locationList = this.props.list.map(item => {
			return ({
				name: item.name,
				position: {
					lat: parseInt(item.location.latitude),
					lng: parseInt(item.location.longitude)
				}
			});
		});
		console.log(locationList)
		const markerList = locationList.map(item =>
			{
				return <Marker
						name={item.name}
						role='application'
						onClick={this.onClickMarker}
						position={item.position} >
            		</Marker>
			});
		
		return (
			
			<Map 
				google={this.props.google}
				style={{width: '100%', height: '100%', position: 'relative'}}
				className={'map'}
				initialCenter={{
					lat: currentLocation.latitude,
					lng: currentLocation.longitude
				}}
				zoom={14}>
					<Marker
      					position={{ lat: 40.730610, lng: -73.935242 }}
    				/>
					
			</Map>
		);
		//return null;
	}
}

export default GoogleApiWrapper({
	apiKey: ''
})(MapContainer);
