// Import necessary modules and hooks from React and react-router-dom.
import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Define the functional component named Edit and export it as the default export.
export default function Edit(props) {
    // The useParams hook returns an object of key/value pairs of
    // the dynamic params from the current URL that were matched by
    // the <Route path>.
    let { id } = useParams();

    // Use the React useState() hook to create state variables for title, cover, and author.
    // These states will be updated using the respective set functions.
    const [title, setTitle] = useState("");
    const [cover, setCover] = useState("");
    const [author, setAuthor] = useState("");

    // useNavigate returns a function that we can use to navigate within the application.
    const navigate = useNavigate();

    // useEffect Hook is similar to componentDidMount. It runs the provided function
    // after the initial render and performs cleanup on unmount.
    useEffect(() => {
        // axios is a promise-based web client.
        // Make an HTTP Request with GET method and pass the book ID as part of the URL.
        axios.get('http://localhost:4000/api/book/' + id)
            .then((response) => {
                // Assign the response data to the state variables using the useState set functions.
                setTitle(response.data.title);
                setCover(response.data.cover);
                setAuthor(response.data.author);
            })
            .catch(function (error) {
                // Log any errors that occur during the HTTP request.
                console.log(error);
            })
    }, []); // The empty dependency array ensures that this effect runs only once after the initial render.

    // Define a function handleSubmit that will be called when the form is submitted.
    const handleSubmit = (event) => {
        // Prevent the default form submission behavior.
        event.preventDefault();

        // Create a newBook object with the updated book information.
        const newBook = {
            id: id,
            title: title,
            cover: cover,
            author: author
        };

        // Make a PUT request to update the book information on the server.
        axios.put('http://localhost:4000/api/book/' + id, newBook)
            .then((res) => {
                // Log the response data and navigate to the '/read' route.
                console.log(res.data);
                navigate('/read');
            });
    }

    // Return the JSX for the Edit component, which includes a form for editing book information.
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* Input field for editing the book title. */}
                <div className="form-group">
                    <label>Add Book Title: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                {/* Input field for editing the release year. */}
                <div className="form-group">
                    <label>Add Release Year: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={cover}
                        onChange={(e) => setCover(e.target.value)}
                    />
                </div>
                {/* Input field for editing the poster URL. */}
                <div className="form-group">
                    <label>Add Poster Url: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                {/* Submit button for editing the book. */}
                <div className="form-group">
                    <input type="submit" value="Edit Book" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}
