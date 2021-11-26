import gql from "graphql-tag"

export const getMe = gql`
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