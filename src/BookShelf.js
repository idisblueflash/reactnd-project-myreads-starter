import React from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

const BookShelf = ({ title, shelf, books, onMoveBookTo}) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                {books.filter(book => book.shelf === shelf).map((book) => (
                    <li key={book.id}>
                        <Book data={book} onMoveBookTo={onMoveBookTo}/>
                    </li>
                ))}
            </ol>
        </div>
    </div>
)

BookShelf.propTypes = {
    onMoveBookTo: PropTypes.func.isRequired,
    shelf: PropTypes.string.isRequired
}

export default BookShelf
