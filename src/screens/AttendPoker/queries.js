import {gql} from "apollo-boost";

export const FIND_SESSION_BY_NUMBER_QUERY = gql`
    query findSessionBySessionNumber($sessionNumber: Int!) {
        findSessionBySessionNumber(sessionNumber: $sessionNumber)
        {
            id
            sessionNumber
        }
    }
`;
