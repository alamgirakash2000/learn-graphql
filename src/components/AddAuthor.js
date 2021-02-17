import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { addAuthorMutation } from "../GraphQL/Mutations";
import { getAllAuthors } from "../GraphQL/Queries";

const AddAuthor = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const [addAuthor, { error }] = useMutation(addAuthorMutation);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, age);

    addAuthor({
      variables: {
        name: name,
        age: age,
      },
      refetchQueries: [{ query: getAllAuthors }],
    })
      .then(() => {
        setName("");
        setAge(0);
        alert("New Book added successfully");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="addAuthor">
      <form className="addAuthor__form" onSubmit={(e) => handleSubmit(e)}>
        <h4 className="text-center">Add an Author</h4>
        <div className="form-group row my-2">
          <label className="col-sm-3 col-form-label">Name :</label>
          <div className="col-sm-9">
            <input
              type="text"
              required
              className="form-control"
              placeholder="Name of the Author"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row my-2">
          <label className="col-sm-3 col-form-label">Age :</label>
          <div className="col-sm-9">
            <input
              type="number"
              className="form-control"
              placeholder="Age of the Author"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
        </div>
        <button className="btn btn-info mt-4" type="submit">
          Add Author
        </button>
      </form>
    </div>
  );
};

export default AddAuthor;
