import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { getAllBooks, getBookQuery } from "../GraphQL/Queries";
import { deleteBookMutation } from "../GraphQL/Mutations";
import UpdateModal from "./UpdateModal";

const BookDetails = ({ currentBook }) => {
  const [book, setBook] = useState({});
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: currentBook },
  });
  const [deleteBook] = useMutation(deleteBookMutation);

  useEffect(() => {
    setBook(data?.book);
  }, [data]);

  const handleDeleteBook = (book) => {
    let confirm = window.confirm(
      `Are you sure you want to delete "${book.name}"`
    );
    if (confirm) {
      deleteBook({
        variables: { id: book.id },
        refetchQueries: [{ query: getAllBooks }],
      })
        .then((res) => {
          console.log(res);
          alert(
            `The book "${res.data.deleteBook.name}" by ${res.data.deleteBook.author.name} is deleted successfully`
          );
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <div className="book-details">
      {loading && <h4>Book's details is loading</h4>}

      <UpdateModal book={book} />

      {book && (
        <div>
          <h3>Selected book's details here :</h3>
          <p>
            <b>Name : </b> {book.name}
          </p>
          <p>
            <b>Genre : </b> {book.genre}
          </p>
          <p>
            <b>Author : </b> {book.author?.name}
          </p>
          <h4 className="text-info">More books from the author: </h4>
          <ol>
            {book.author?.books
              .filter((b) => b.id !== currentBook)
              .map((book) => (
                <li key={book.id}>{book.name}</li>
              ))}
          </ol>
          <div className="bookDetails__buttons text-center">
            <button
              className="btn btn-warning m-3"
              data-bs-toggle="modal"
              data-bs-target="#updateModal"
            >
              Update
            </button>
            <button
              className="btn btn-danger m-3"
              onClick={() => handleDeleteBook(book)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
      {!loading && !book && <h3>No book is selected</h3>}
    </div>
  );
};

export default BookDetails;
