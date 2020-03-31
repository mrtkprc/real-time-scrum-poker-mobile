import {gql} from 'apollo-boost';

export const PARTICIPANTS_IN_SESSION_QUERY = gql`
    query session($id: ID!) {
        session(id: $id )
        {
            participants{
                id
                nickname
            }
        }
    }
`;

export const NEW_PARTICIPANT_ARRIVED_SUBSCRIPTION = gql`
    subscription onNewParticipantArrived($sessionId: ID)  {
        newParticipantArrived(sessionId: $sessionId) {
            id
            nickname
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
