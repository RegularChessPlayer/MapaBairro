import React, {Component} from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import MapComponent from './Map.js'
import sortBy from 'sort-by'

class Search extends Component {
    
    static propTypes = {
        places: PropTypes.array.isRequired,
    }
    
    componentDidMount(){
        this.setState()
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({query: query.trim()})
    }

    clearQuery = () => {
        this.setState({ query: '' })
    }

    render(){
    const {places} = this.props
    const {query} = this.state
    
    let showingPlaces
    if (query) {
        const match = new RegExp(escapeRegExp(query), 'i')
        showingPlaces = places.filter((place) => match.test(place.title))
    } else {
        showingPlaces = places
    }
    showingPlaces.sort(sortBy('title'))
    return (
    <div className='List-contacts'>
        <div className='list-contact-top'>
            <input
            className='search-contacts'
            type='text'
            placeholder='Search contacts'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
            />
        </div>
        
        {showingPlaces.length !== places.length && (
          <div className='showing-contacts'>
            <span>Now showing {showingPlaces.length} of {places.length} total</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}

        <ol className='contact-list'>
            {showingPlaces.map((place) => ( 
                <li key={place.title} className='contact-list-item'>
                    <div className='contact-details'>
                        <p>{place.title}</p>
                    </div>
                </li>
            ))}
        </ol>
        <MapComponent placesToDisplay={showingPlaces}/>
        </div>
    )
    }
}

export default Search
