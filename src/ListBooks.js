import React from 'react'
import { Link } from 'react-router-dom'

import BookShelf from './BookShelf'


const shelves = {
    currentlyReading: 'Currently Reading',
    read: 'Read',
    wantToRead: 'Want to Read'
};

const ListBooks = ({ books, onMoveBookTo }) => (
    <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
                {Object.keys(shelves).map(shelfKey =>
                    <BookShelf title={shelves[shelfKey]}
                        shelf={shelfKey}
                        books={books}
                        onMoveBookTo={onMoveBookTo}
                        key={shelfKey}
                    />
                )}
            </div>
        </div>
        <div className="open-search">
        <Link
            to="/search" >Add a book</Link>
        </div>
    </div>
);

export default ListBooks
