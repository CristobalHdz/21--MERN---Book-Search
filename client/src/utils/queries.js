import gql from "graphql-tag"

export const GET_ME = gql`
{
    me{
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
}`