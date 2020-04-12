import {gql} from "apollo-boost";

export const CREATE_SCRUM_MASTER_WITH_SESSION_MUTATION = gql`
    mutation createScrumMasterWithSession($sessionNumber: Int!, $description: String ) {
        createScrumMasterWithSession(data: { sessionNumber: $sessionNumber, description: $description })
        {
            id
            nickname
            isManager
            session {
                id
                sessionNumber
            }
        }
    }
`;
