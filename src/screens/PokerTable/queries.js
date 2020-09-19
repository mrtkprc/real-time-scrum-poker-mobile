import {gql} from 'apollo-boost';

export const PARTICIPANTS_IN_SESSION_QUERY = gql`
    query session($id: ID!) {
        session(id: $id )
        {
            participants{
                id
                nickname
                isManager
                vote{
                    isGiven
                }
            }
        }
    }
`;

export const NEW_PARTICIPANT_ARRIVED_SUBSCRIPTION = gql`
    subscription onNewParticipantArrived($sessionId: ID)  {
        newParticipantArrived(sessionId: $sessionId) {
            id
            nickname
            isManager
            vote{
                isGiven
            }
        }
    }
`;

export const VOTE_GIVEN_SUBSCRIPTION = gql `
    subscription onVoteGiven($sessionId: ID){
        voteGiven(sessionId: $sessionId) {
            isGiven
            participant{
                id
            }
        }
    }
`;

export const ADD_VOTE_MUTATION = gql`
    mutation addVote($vote: String!, $sessionId: ID!, $participantId: ID! ) {
        addVote(data: {vote: $vote, sessionId: $sessionId, participantId: $participantId })
        {
            id
            vote
        }
    }
`;

export const FORWARD_TEAM_TO_DEFINITE_SCREEN_SUBSCRIPTION = gql`
    subscription onForwardTeamToDefiniteScreenSubscription($sessionId: ID!){
        forwardTeamToDefiniteScreenSubscription(sessionId: $sessionId)
    }
`;

export const FORWARD_TEAM_TO_DEFINITE_SCREEN_MUTATION = gql`
    mutation forwardTeamToDefiniteScreen($sessionId: ID!, $screenName: String!, $delayDuration: Int!){
        forwardTeamToDefiniteScreen(sessionId: $sessionId, screenName: $screenName, delayDuration: $delayDuration)
    }
`;

export const ALL_VOTES_DELETED = gql`
    subscription onAllVotesDeleted($sessionId: ID!){
        allVotesDeleted(sessionId: $sessionId)
    }
`;
