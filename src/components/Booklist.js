import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { getAllBooks } from "../GraphQL/Queries";

const Booklist = ({ setCurrentBook }) => {
  const [books, setBooks] = useState();
  const { error, loading, data } = useQuery(getAllBooks);

  useEffect(() => {
    setBooks(data?.books);
  }, [data]);

  return (
    <div className="bookList text-center">
      {loading ? (
        <h3>Loading Books ...</h3>
      ) : (
        <ul className="bookList__list">
          {books?.map((book) => (
            <li key={book.id} onClick={() => setCurrentBook(book.id)}>
              {book.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Booklist;
