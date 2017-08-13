import React from 'react'
import PropTypes from 'prop-types'

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

class ListBooks extends React.Component {
    render() {
        return (
             <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Bookshelf title="Currently Reading" 
                            shelf='currentlyReading' 
                            books={this.props.books}
                            onMoveBookTo={this.props.onMoveBookTo} />
                        <Bookshelf title="Want to Read"
                            shelf='wantToRead'
                            books={this.props.books}
                            onMoveBookTo={this.props.onMoveBookTo} />
                        <Bookshelf title="Read"
                            shelf='read'
                            books={this.props.books}
                            onMoveBookTo={this.props.onMoveBookTo} />
                    </div>
                </div>
                <div className="open-search">
                    <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
                </div>
            </div>
        )
    }
}

export  { ListBooks, Book }
