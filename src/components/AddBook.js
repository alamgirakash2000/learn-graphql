import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { getAllAuthors, getAllBooks } from "../GraphQL/Queries";
import { addBookMutation } from "../GraphQL/Mutations";

const AddBook = () => {
  const [authors, setAuthors] = useState();
  const [bookName, setBookName] = useState("");
  const [bookGenre, setBookGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  const { loading, data } = useQuery(getAllAuthors);
  const [addBook, { error }] = useMutation(addBookMutation);

  useEffect(() => {
    setAuthors(data?.authors);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    addBook({
      variables: {
        name: bookName,
        genre: bookGenre,
        authorId: authorId,
      },
      refetchQueries: [{ query: getAllBooks }],
    })
      .then((res) => {
        setBookName("");
        setBookGenre("");
        setAuthorId("");
        alert("New Book added successfully");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="addBook">
      <h3>Add a new Book</h3>
      <form className="addBook__form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group row my-2">
          <label htmlFor="staticEmail" className="col-sm-3 col-form-label">
            Name :
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              required
              className="form-control"
              id="staticEmail"
              placeholder="Give a Book name"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row my-2">
          <label htmlFor="genre" className="col-sm-3 col-form-label">
            Genre :
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="inputPassword"
              placeholder="Genre of the book"
              name="genre"
              value={bookGenre}
              onChange={(e) => setBookGenre(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="author" className="col-sm-3 col-form-label">
            Example select :
          </label>
          <div className="col-sm-9">
            <select
              name="authorId"
              className="form-control"
              placeholder="Select author"
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
              id="author"
            >
              {authors?.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="btn btn-success mt-4" type="submit">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
