import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {PARTICIPANTS_IN_SESSION_QUERY} from './queries'
import {ScrollView, Text, View, FlatList} from "react-native";
import ListItem from "./ListItem";

const ParticipantList = (props) => {
    const { loading, error, data } = useQuery(PARTICIPANTS_IN_SESSION_QUERY,{
        variables: { "id":  props.sessionId },
    });

    if (loading) return <View><Text>Loading...</Text></View>
    if (error) return  <ScrollView><Text>{JSON.stringify(error)}</Text></ScrollView>

    return (
        <FlatList
            data={data.session.participants}
            renderItem={({item}) => <ListItem item={item}/> }
            keyExtractor={item => item.nickname}
        />
    );
};

export default ParticipantList;
