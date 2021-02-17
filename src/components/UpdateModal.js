import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { getAllBooks, getBookQuery } from "../GraphQL/Queries";
import { updateBookMutation } from "../GraphQL/Mutations";

const UpdateModal = ({ book }) => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [updateBook, { error }] = useMutation(updateBookMutation);

  useEffect(() => {
    setName(book?.name || "");
    setGenre(book?.genre || "");
  }, [book]);

  const handleUpdate = () => {
    updateBook({
      variables: {
        id: book.id,
        name: name,
        genre: genre,
      },
      refetchQueries: [{ query: getBookQuery }, { query: getAllBooks }],
    });
  };

  return (
    <div className="modal text-dark" tabIndex="-1" id="updateModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Book</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="form-group row my-2">
              <label className="col-sm-3 col-form-label">Name :</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="Give a Book name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row my-2">
              <label className="col-sm-3 col-form-label">Genre :</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Genre of the book"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleUpdate(book)}
              data-bs-dismiss="modal"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
