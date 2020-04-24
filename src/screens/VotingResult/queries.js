import {gql} from "apollo-boost";

export const VOTE_RESULTS_QUERY = gql `
    query voteResults($sessionId: ID!) {
    voteResults(sessionId: $sessionId) {
        vote
        total
    }
}
`;
