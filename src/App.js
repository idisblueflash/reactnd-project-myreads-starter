import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import './App.css'

// TODO: assign shelf in option with shelf datas
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
                        <select onChange={(e) => this.props.onMoveBookTo(e, this.props.data)}>
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

class Bookshelf extends React.Component{ 
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

Bookshelf.propTypes = {
    onMoveBookTo: PropTypes.func.isRequired,
    shelf: PropTypes.string.isRequired
}

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: false,
        books:[],
        query: ''
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books})
        })
    }

    handle_move_book_to = (e, selected_book) => {
        const new_shelf = e.target.value
        
        this.setState((state)=> ({
            books: state.books.map((book) => {
                if(book.id === selected_book.id) {
                    book.shelf = new_shelf
                }
                return book
            })
        }))

        BooksAPI.update(selected_book, new_shelf)
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim()})
    }

    render() {
        const { query } = this.state

        if (query) {
            
        }
        
        return (
            <div className="app">
                {this.state.showSearchPage ? (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
                            <div className="search-books-input-wrapper">
                                <input 
                                    type="text"
                                    value={query}
                                    onChange={(event) => this.updateQuery(event.target.value)}
                                    placeholder="Search by title or author"/>
                            </div>
                        </div>
                        <div className="search-books-results">
                            <ol className="books-grid">
                                {this.state.books.map(book => (
                                    <li key={book.id}>
                                        <Book data={book} onMoveBookTo={this.handle_move_book_to}/>
                                    </li>
                                    ))}
                            </ol>
                        </div>
                    </div>
                ) : (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <Bookshelf title="Currently Reading" 
                                    shelf='currentlyReading' 
                                    books={this.state.books}
                                    onMoveBookTo={this.handle_move_book_to} />
                                <Bookshelf title="Want to Read"
                                    shelf='wantToRead'
                                    books={this.state.books}
                                    onMoveBookTo={this.handle_move_book_to} />
                                <Bookshelf title="Read"
                                    shelf='read'
                                    books={this.state.books}
                                    onMoveBookTo={this.handle_move_book_to} />
                            </div>
                        </div>
                        <div className="open-search">
                            <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default BooksApp
