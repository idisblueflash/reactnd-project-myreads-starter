import React from 'react'
import { Link } from 'react-router-dom'

import BookShelf from './BookShelf'

class ListBooks extends React.Component {
    render() {
        return (
             <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf title="Currently Reading"
                            shelf='currentlyReading' 
                            books={this.props.books}
                            onMoveBookTo={this.props.onMoveBookTo} />
                        <BookShelf title="Want to Read"
                            shelf='wantToRead'
                            books={this.props.books}
                            onMoveBookTo={this.props.onMoveBookTo} />
                        <BookShelf title="Read"
                            shelf='read'
                            books={this.props.books}
                            onMoveBookTo={this.props.onMoveBookTo} />
                    </div>
                </div>
                <div className="open-search">
                <Link
                    to="/search" >Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ListBooks
