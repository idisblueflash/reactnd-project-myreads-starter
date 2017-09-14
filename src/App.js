import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'



class BooksApp extends React.Component {
    state = {
        books:[],
        query: '',
        showingBooks: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
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
                // Update search result book's shelf if it exist in home books
                const homeBooks = this.state.books
                const updatedBooks = showingBooks.map(showingBook => {
                    homeBooks.forEach( homeBook => {
                        if (homeBook.id === showingBook.id ) {
                            showingBook.shelf = homeBook.shelf
                        }
                    })
                    return showingBook
                })
                this.setState({ showingBooks: updatedBooks })
            })
        } else {
            this.setState({ showingBooks: books})
        }
    }

    clearSearchResults = () => {
        this.setState({ query: '', showingBooks: [] })
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                   <ListBooks 
                        books={this.state.books} 
                        onMoveBookTo={this.handle_move_book_to} />
                )} />
                <Route path="/search" render={() => (
                    <SearchBooks
                        query={this.state.query}
                        onUpdateQuery={this.updateQuery}
                        onClearSearchResults={this.clearSearchResults}
                        showingBooks={this.state.showingBooks}
                        onMoveBookTo={this.handle_move_book_to} />
                )} />
            </div>
        )
    }
}

export default BooksApp
