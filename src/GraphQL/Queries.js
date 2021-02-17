import { gql } from "@apollo/client";

export const getAllBooks = gql`
  query {
    books {
      name
      id
    }
  }
`;

export const getAllAuthors = gql`
  query {
    authors {
      name
      id
    }
  }
`;

export const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;
