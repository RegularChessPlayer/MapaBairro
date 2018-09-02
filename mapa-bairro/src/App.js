import React, { Component } from 'react';
import './App.css';
import Search from './components/Search.js';


class App extends Component {
  
  state ={
    //Add more places here if required.
    places:[
        {title: 'Colégio José de Alencar', location: {lat: -3.7196521, lng: -38.5854607}},
        {title: 'Igreja Assembleia de Deus', location: {lat: -3.7196521, lng:-38.583272}},
        {title: 'Mercado CenterBox', location: {lat: -3.7174681, lng: -38.5811995}},
        {title: 'Farmacia 1', location: {lat: -3.7207799, lng: -38.58343}},
        {title: 'Farmacia 2', location: {lat: -3.714221, lng: -38.5787095}}
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