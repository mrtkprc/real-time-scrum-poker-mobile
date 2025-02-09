import {gql} from "apollo-boost";

export const VOTE_RESULTS_QUERY = gql`
    query voteResults($sessionId: ID!) {
        voteResults(sessionId: $sessionId) {
            vote
            total
        }
    }`;

export const VOTE_INDIVIDUAL_RESULTS = gql`
    query session($id: ID!) {
        session(id: $id){
            votes{
                participant{
                    nickname
                    vote{
                        id
                        vote
                        isGiven
                    }
                }
            }
        }
    }
`;

export const DELETE_ALL_VOTES = gql`
    mutation deleteAllVotesOnSession($sessionId: ID!){
        deleteAllVotesOnSession(sessionId: $sessionId)
    }
`;
