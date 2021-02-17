import React, { useState } from "react";
import AddAuthor from "./components/AddAuthor";
import AddBook from "./components/AddBook";
import BookDetails from "./components/BookDetails";

import BookList from "./components/Booklist";

function App() {
  const [currentBook, setCurrentBook] = useState("");

  return (
    <div className="app">
      <div className="row">
        <div className="app__left col-md-7">
          <h1 className="app__title">Akash's Reading List</h1>
          <BookList setCurrentBook={setCurrentBook} />
          <AddBook />
        </div>
        <div className=" app__right col-md-5">
          <BookDetails currentBook={currentBook} />
          <AddAuthor />
        </div>
      </div>
    </div>
  );
}

export default App;
