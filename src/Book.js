import React from 'react'
import PropTypes from 'prop-types'

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
                        <select value={this.props.data.shelf || "none"} onChange={(e) => this.props.onMoveBookTo(e, this.props.data)}>
                            <option value="moveto" disabled>Move to...</option>
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

export  default Book
