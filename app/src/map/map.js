import React, {useState} from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

	const MapContainer = (props) => {
		const [ selected, setSelected ] = useState({});

		const onSelect = item => {
			setSelected(item);
		};

		const mapStyles = {        
			height: "100vh",
			width: "100%"
		};

		var defaultCenter = {}, locations = {};
		if (props.locationList.length > 0) {
			defaultCenter = props.selectedPlace.location;
			locations = props.locationList;
		}
		else {
			defaultCenter = {
				lat: 41.3851, lng: 2.1734
			};
			locations = [
				{
					name: "Location 1",
					location: { 
						lat: 41.3954,
						lng: 2.162 
					},
				},
				{
					name: "Location 2",
					location: { 
						lat: 41.3917,
						lng: 2.1649
					},
				},
				{
					name: "Location 3",
					location: { 
						lat: 41.3773,
						lng: 2.1585
					},
				},
				{
					name: "Location 4",
					location: { 
						lat: 41.3797,
						lng: 2.1682
					},
				},
				{
					name: "Location 5",
					location: { 
						lat: 41.4055,
						lng: 2.1915
					},
				}
			];
		}
		
		var x = locations.map(item => {
			return (
				<Marker key={item.name} 
					position={item.location}
					onClick={() => onSelect(item)}
				/>
			)
		})

		console.log(x)
		

		return (
			<LoadScript
				googleMapsApiKey='AIzaSyBOrjy_fGYlxK9X_zjJWvCZRvON60-xxBI'>
				<GoogleMap
					mapContainerStyle={mapStyles}
					zoom={13}
					center={defaultCenter}
				>
					{
						locations.map(item => {
							return (
								<Marker key={item.name} 
									name = {item.name}
									position={item.location}
									onClick={() => onSelect(item)}
								/>
							)
						})
					}
					{
						selected.location && 
						(
							<InfoWindow
								position={selected.location}
								clickable={true}
								onCloseClick={() => setSelected({})}
							>
								<p>{selected.name}</p>
							</InfoWindow>
						)
					}
				</GoogleMap>
			</LoadScript>
		)
	}

export default MapContainer;