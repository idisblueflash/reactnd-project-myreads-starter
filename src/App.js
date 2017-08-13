import React from 'react'
import * as BooksAPI from './BooksAPI'
import { ListBooks }  from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'



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
        query: '',
        showingBooks: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
            this.setState({ showingBooks: books})
        })
    }

    handle_move_book_to = (e, selected_book) => {
        const new_shelf = e.target.value

        let currentBooks
        const { books } = this.state

        if (!books.includes(selected_book)) {
            currentBooks = books.concat(selected_book)
        } else {
            currentBooks = books
        }

        const booksWithShelf = currentBooks.map((book) => {
            if(book.id === selected_book.id) {
                book.shelf = new_shelf
            }
            return book
        })

        this.setState({ books: booksWithShelf })

        BooksAPI.update(selected_book, new_shelf)
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim()})

        const { books } = this.state
        if (query) {
            BooksAPI.search(query, 20).then((showingBooks) => {
                this.setState({ showingBooks })
            })
        } else {
            this.setState({ showingBooks: books})
        }
    }

    render() {
        
        return (
            <div className="app">
                {this.state.showSearchPage ? (
                    <SearchBooks
                        query={this.state.query}
                        onUpdateQuery={this.updateQuery}
                        showingBooks={this.state.showingBooks}
                        onMoveBookTo={this.handle_move_book_to} />
                ) : (
                   <ListBooks 
                        books={this.state.books} 
                        onMoveBookTo={this.handle_move_book_to} />
                )}
            </div>
        )
    }
}

export default BooksApp
