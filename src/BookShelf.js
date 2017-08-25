import React from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

class BookShelf extends React.Component{ 
    render() {
        const books = this.props.books.filter(book => book.shelf === this.props.shelf)

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
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

BookShelf.propTypes = {
    onMoveBookTo: PropTypes.func.isRequired,
    shelf: PropTypes.string.isRequired
}

export default BookShelf
