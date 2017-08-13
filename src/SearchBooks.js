import React from 'react'
import { Book }  from './ListBooks'
import { Link } from 'react-router-dom'

class SearchBooks extends React.Component {
	render() {
		return(
			<div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search"
                    	to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text"
                            value={this.props.query}
                            onChange={(event) => this.props.onUpdateQuery(event.target.value)}
                            placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.props.showingBooks.map(book => (
                            <li key={book.id}>
                                <Book data={book} onMoveBookTo={this.props.onMoveBookTo}/>
                            </li>
                            ))}
                    </ol>
                </div>
            </div>
		)
	}
}

export default SearchBooks
