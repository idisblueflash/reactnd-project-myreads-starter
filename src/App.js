import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

class Book extends React.Component{
  render() {
    
    const cover_str = 'url(' + this.props.cover + ')'

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: cover_str }}></div>
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors}</div>
      </div>
    )
  }
}


class Bookshelf extends React.Component{ 
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => (
              <li key={book.id}>
                <Book cover={book.imageLinks.thumbnail}
                  title={book.title}
                  authors={book.authors} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
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
    current_reading_books:[],
    want_to_read_books:[],
    read_books:[],
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books})
      this.setState({ current_reading_books: books.filter(book => book.pageCount > 400)})
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.books.map(book => (
                  <li key={book.id}>
                    <Book cover={book.imageLinks.thumbnail}
                      title={book.title}
                      authors={book.authors} />
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
                  books={this.state.current_reading_books} />
                <Bookshelf title="Want to Read"
                  books={this.state.want_to_read_books} />
                <Bookshelf title="Read"
                  books={this.state.read_books} />
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
