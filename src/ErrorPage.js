import React from 'react'
import { Link } from 'react-router-dom'


const ErrorPage = ({ message='Page not Found.' }) => (
    <div className="error-page">
        <div className="error-page-title list-books-title">
            <h1>Error Page</h1>
        </div>
        <div className="error-page-content bookshelf">
            <h2>{ message }</h2>
        </div>
        <div className="go-back-home">
        <Link className="close-search"
            to="/" >Home</Link>
        </div>
    </div>
);

export default ErrorPage
