import React from 'react';
import './App.css';
import MapComponent from '../map/map';
const axios = require('axios');

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			detailsView: false,
			displayValue: null
		};
		this.displayValue = null;
		this.detailsView = false;
		this.lat = 40.730610;
		this.long = -73.935242;
		this.googleMapsPromise = null;
		this.renderTiles = this.renderTiles.bind(this);
		this.handleClickShow = this.handleClickShow.bind(this);
		this.renderDetails = this.renderDetails.bind(this);
		this.handleClickNoshow = this.handleClickNoshow.bind(this);
		this.searchHandler = this.searchHandler.bind(this);
	}

	componentDidMount = () => {
		let lat, long
		navigator.geolocation.getCurrentPosition(function(position) {
			lat = position.coords.latitude;
			long = position.coords.longitude;
		});
		this.lat = lat ? lat : this.lat;
		this.long = long ? long : this.long;
		this.apiKey = '35bb318f120358404e5ff754e12cd183';
		this.hostname = 'developers.zomato.com';
		this.apiVersion = '/api/v2.1';
		this.endpoint = 'search';
		this.count = 20;
		let path = `https://${this.hostname}${this.apiVersion}/${this.endpoint}?count=${this.count}&lat=${this.lat}&lon=${this.long}&radius=50000`;
		const headers = {
			'user-key': this.apiKey
		};
		axios.get(path, {headers}) .then(res => { 
			this.setState({
				list: res.data.restaurants
			});
		});

	}
	renderDetails = () => {
		var key = parseInt(this.state.displayValue);
		let item = this.state.list.filter( function (x) {
			return parseInt(x.restaurant.id) === key
		})[0];
		
		if (item) {
			const R = 6371e3;
			const φ1 = this.lat * Math.PI/180; 
			const φ2 = item.restaurant.location.latitude * Math.PI/180;
			const Δφ = (item.restaurant.location.latitude-this.lat) * Math.PI/180;
			const Δλ = (item.restaurant.location.longitude-this.long) * Math.PI/180;

			const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
						Math.cos(φ1) * Math.cos(φ2) *
						Math.sin(Δλ/2) * Math.sin(Δλ/2);
			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

			const distance = R * c; // in metres
			return(
				<div className= "detailed-view">
					<input type="button" onClick={this.handleClickNoshow} value='Back'></input>
					<div><span>Name </span><span>{item.restaurant.name}</span></div>
					<div><span>Rating </span><span>{item.restaurant.user_rating.aggregate_rating}</span></div>
					<div><span>No of review </span><span>{item.restaurant.user_rating.votes}</span></div>
					<div><span>Phone </span><span>{item.restaurant.phone_numbers}</span></div>
					<div><span>Address </span><span>{item.restaurant.location.address}</span></div>
					<div><span>Distance </span><span>{distance}</span></div>
				</div>
			);
		}
		else {
			return null
		}

	}
    renderTiles = () => {
		if (this.state.list.length > 0) {
			const listItems = this.state.list.map(item =>
				{
					return <div className="list" key={item.restaurant.id}>
						<input type="button" onClick={this.handleClickShow} value={item.restaurant.name} dirName={item.restaurant.id}></input>
						<p>{item.restaurant.cuisines}</p>
						<p>{item.restaurant.location.address}</p>
						<p>{item.restaurant.price_range}</p>
					</div>
				})
			return <div className="flex-container">
				
				{listItems}
			
			</div>;
		}
		else {
			return <div className="flex-container">
				
				
			
			</div>;
		}
	  
	}

	searchHandler = (e) => {
		let path = `https://${this.hostname}${this.apiVersion}/search?entity_type=city&count=${this.count}&q=${this.refs.search.value}`;
		const headers = {
			'user-key': this.apiKey
		};
		axios.get(path, {headers}) .then(res => { 
			this.setState({
				list: res.data.restaurants
			}, this.renderTiles);
		});

	}

	handleClickNoshow = (e) =>{
		this.setState({
			detailsView: false,
			displayValue: null
		});
	}

	handleClickShow = (e) => {
		this.setState({
			detailsView: true,
			displayValue: e.target.dirName
		});
	}

  	render = () => {
		var detailsView = this.state.detailsView;
		var tiles = !detailsView ? this.renderTiles() : this.renderDetails();
		var selectedPlace = {
			
				name: "Your location",
				location: {
					address: "",
					lat: parseInt(this.lat),
					lng: parseInt(this.long)
				}
			
			
		};
		
		var locationList = this.state.list.map(item => {
			return ({
				name: item.restaurant.name,
				location: {
					lat: parseInt(item.restaurant.location.latitude),
					lng: parseInt(item.restaurant.location.longitude)
				}
			})
		});
		
		return (
    		<div className="App">
				<label htmlFor="search"> Search by name </label>
				<input type="text" placeholder="Search" ref="search"/>
				<input type="button" onClick={this.searchHandler} value="Search"></input>
				{tiles}
				<MapComponent selectedPlace = {selectedPlace}  locationList = {locationList} google />
    		</div>
		);
	}
}


export default App;