import {gql} from "apollo-boost";

export const CREATE_PARTICIPANT_MUTATION = gql`
    mutation createParticipant($nickname: String!, $sessionNumber: Int! ) {
        createParticipant(
            data: { nickname: $nickname,
                sessionNumber: $sessionNumber })
        {
            id
            nickname
            isManager
            session{
                id
                sessionNumber
            }
            vote{
                id
                vote
                isGiven
            }
        }
    }
`;
