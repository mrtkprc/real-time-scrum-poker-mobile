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
export const CREATE_PARTICIPANT_MUTATION = gql`
    mutation createParticipant($nickname: String!, $sessionNumber: Int! ) {
        createParticipant(
            data: { nickname: $nickname,
                sessionNumber: $sessionNumber })
        {
            id
            nickname
        }
    }
`;
