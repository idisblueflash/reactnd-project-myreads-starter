import React from 'react'
import { Link } from 'react-router-dom'

import BookShelf from './BookShelf'

const ListBooks = ({ books, onMoveBookTo }) => (
    <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
                <BookShelf title="Currently Reading"
                    shelf='currentlyReading' 
                    books={books}
                    onMoveBookTo={onMoveBookTo} />
                <BookShelf title="Want to Read"
                    shelf='wantToRead'
                    books={books}
                    onMoveBookTo={onMoveBookTo} />
                <BookShelf title="Read"
                    shelf='read'
                    books={books}
                    onMoveBookTo={onMoveBookTo} />
            </div>
        </div>
        <div className="open-search">
        <Link
            to="/search" >Add a book</Link>
        </div>
    </div>
);

export default ListBooks
