import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { PARTICIPANTS_IN_SESSION_QUERY, NEW_PARTICIPANT_ARRIVED_SUBSCRIPTION, VOTE_GIVEN_SUBSCRIPTION } from './queries'
import { ScrollView, Text, View, FlatList} from "react-native";
import ListItem from "./ListItem";
import { useForceUpdate } from "../../helpers/general";


const ParticipantList = (props) => {
    const [newParticipantId, setNewParticipantId] = useState("");
    const {loading, error, data, subscribeToMore} = useQuery(PARTICIPANTS_IN_SESSION_QUERY, {
        variables: {"id": props.sessionId},
    });
    const forceUpdate = useForceUpdate();

    if (loading) return <View><Text>Loading...</Text></View>;
    if (error) return <ScrollView><Text>{JSON.stringify(error)}</Text></ScrollView>;

    subscribeToMore({
        document: NEW_PARTICIPANT_ARRIVED_SUBSCRIPTION,
        variables: {
            sessionId: props.sessionId
        },
        updateQuery: (prev, {subscriptionData}) => {
            if (!subscriptionData.data) return prev;
            const newParticipant = subscriptionData.data.newParticipantArrived;
            if (!prev.session.participants.find((participant) => participant.id === newParticipant.id)) {
                setNewParticipantId(newParticipant.id);
                return {
                    ...prev,
                    session: {
                        ...prev.session,
                        participants: [
                            newParticipant,
                            ...prev.session.participants
                        ]
                    }
                };
            } else {
                return prev;
            }
        }
    });

    subscribeToMore({
        document: VOTE_GIVEN_SUBSCRIPTION,
        variables: {
            sessionId: props.sessionId
        },
        updateQuery:  (prev, {subscriptionData}) => {
            if (!subscriptionData.data) return prev;
            const voteGiven = subscriptionData.data.voteGiven;
            if(voteGiven) {
                prev.session.participants.forEach((participant, index) => {
                    if(participant.id === voteGiven.participant.id) {
                        const copyValue = Object.assign({},prev);

                        copyValue.session.participants[index] = {
                            ...participant,
                            vote: {
                                isGiven: 1
                            }
                        };

                        forceUpdate();
                        return copyValue;
                    }
                    else
                        return prev;
                })
            }
            else
                return prev;
        }
    });

    return (
        <FlatList
            data={data.session.participants}
            renderItem={({item}) => <ListItem isNewParticipant={item.id.toString() === newParticipantId} item={item}/>}
            keyExtractor={item => item.id}
        />
    );
};

export default ParticipantList;
