import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {PARTICIPANTS_IN_SESSION_QUERY, NEW_PARTICIPANT_ARRIVED_SUBSCRIPTION} from './queries'
import { ScrollView, Text, View, FlatList } from "react-native";
import ListItem from "./ListItem";

const ParticipantList = (props) => {
    const {loading, error, data, subscribeToMore} = useQuery(PARTICIPANTS_IN_SESSION_QUERY, {
        variables: {"id": props.sessionId},
    });

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

    return (
        <FlatList
            data={data.session.participants}
            renderItem={({item}) => <ListItem item={item}/>}
            keyExtractor={item => item.id}
        />
    );
};

export default ParticipantList;
