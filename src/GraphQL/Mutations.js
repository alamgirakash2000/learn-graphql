import { gql } from "@apollo/client";

export const addBookMutation = gql`
  mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

export const addAuthorMutation = gql`
  mutation addAuthor($name: String!, $age: Int!) {
    addAuthor(name: $name, age: $age) {
      name
      id
    }
  }
`;

export const updateBookMutation = gql`
  mutation updateBook($id: ID!, $name: String!, $genre: String!) {
    updateBook(id: $id, name: $name, genre: $genre) {
      name
      id
    }
  }
`;

export const deleteBookMutation = gql`
  mutation deleteBook($id: ID!) {
    deleteBook(id: $id) {
      name
      author {
        name
      }
    }
  }
`;
