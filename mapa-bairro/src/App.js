import React, { Component } from 'react';
import './App.css';
import Search from './components/Search.js';


class App extends Component {
  
  state ={
    //Add more places here if required.
    places:[
        {title: 'Colégio José de Alencar', location: {lat: -3.7196521, lng: -38.5854607}},
        {title: 'Colégio Dom Quintino', location: {lat: -3.724317, lng: -38.589272}},
        {title: 'Mercado CenterBox', location: {lat: -3.7174681, lng: -38.5811995}},
        {title: 'Farmacia 1', location: {lat: -3.7207799, lng: -38.58343}},
        {title: 'Farmacia A', location: {lat: -3.7207799, lng: -38.58500}},
        ]
  }
  
  render() {
    return (
      <div className="App">
        <Search  places={this.state.places}/>
      </div>
    );
  }
}

export default App;