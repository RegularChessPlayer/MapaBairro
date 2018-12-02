import React, {Component} from 'react'

class Search extends Component {
      
    componentDidMount(){
        this.setState()
    }

    render(){
    const {showingPlaces, updateQuery, clearQuery, isShowAll, totalPlaces} = this.props
    const {query} = this.props
    const {moreInfo} = this.props
    
    return (
    <div className='List-contacts'>
        <div className='list-contact-top'>
            <input
            className='search-contacts'
            type='text'
            placeholder='Search contacts'
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            />
        </div>
        
        {isShowAll && (
          <div className='showing-contacts'>
            <span>Now showing {showingPlaces.length} of {totalPlaces} total</span>
            <button onClick={clearQuery}>Show all</button>
          </div>
        )}

        <ol className='contact-list'>
            {showingPlaces.map((markerInfo) => ( 
                <li key={markerInfo.title} className='contact-list-item'>
                    <div className='contact-details'>
                        <p>{markerInfo.title}</p>
                        <button onClick={() => moreInfo(markerInfo)}>More Info</button>
                    </div>
                </li>
            ))}
        </ol>
        </div>
    )
    }
}

export default Search
