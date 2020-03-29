import React, {useState} from 'react';
import {useQuery, useSubscription} from '@apollo/react-hooks';
import {PARTICIPANTS_IN_SESSION_QUERY, NEW_PARTICIPANT_ARRIVED_SUBSCRIPTION} from './queries'
import {ScrollView, Text, View, FlatList} from "react-native";
import ListItem from "./ListItem";

const ParticipantList = (props) => {
    const { loading, error, data, refetch } = useQuery(PARTICIPANTS_IN_SESSION_QUERY,{
        variables: { "id":  props.sessionId },
    });

    if (loading) return <View><Text>Loading...</Text></View>
    if (error) return  <ScrollView><Text>{JSON.stringify(error)}</Text></ScrollView>

    return (
        <>
            <FlatList
                data={data.session.participants}
                renderItem={({item}) => <ListItem item={item}/> }
                keyExtractor={item => item.id}
            />
            <NewParticipantArrived refetch={refetch} participantList={data.session.participants}/>
        </>
    );
};

const NewParticipantArrived = (props) => {
    const { data, loading } = useSubscription(
        NEW_PARTICIPANT_ARRIVED_SUBSCRIPTION,
        { variables: { "sessionId": "5e7dfdfdea4ab4384f7b3bf1" } }
    );

    if(!loading)
    {
        props.refetch();
    }

    return null;
};

export default ParticipantList;
