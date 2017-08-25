import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import BookShelf from './BookShelf'

class Book extends React.Component{
    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" 
                        style={{ 
                            width: 128, 
                            height: 193, 
                            backgroundImage: 'url(' + this.props.data.imageLinks.thumbnail + ')' 
                        }}></div>
                    <div className="book-shelf-changer">
                        <select value={this.props.data.shelf} onChange={(e) => this.props.onMoveBookTo(e, this.props.data)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.data.title}</div>
                <div className="book-authors">{this.props.data.authors}</div>
            </div>
        )
    }
}

Book.propTypes = {
    onMoveBookTo: PropTypes.func.isRequired
}

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

export  { ListBooks, Book }
