import gql from 'graphql-tag'

export const qStudents = gql`
  {
    students {
      _id
      name
    }
  }
`

export const qCheckAttendance = gql`
  mutation checkAttendance($owner: ObjectId!, $date: String!) {
    checkAttendance(owner: $owner, date: $date) {
      _id
      owner
      date
      items {
        type
        value
      }
      etc
    }
  }
`
