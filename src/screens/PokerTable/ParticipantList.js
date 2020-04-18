import React, {useState} from 'react';
import {useQuery, useSubscription} from '@apollo/react-hooks';
import {PARTICIPANTS_IN_SESSION_QUERY, NEW_PARTICIPANT_ARRIVED_SUBSCRIPTION, VOTE_GIVEN_SUBSCRIPTION} from './queries'
import {View, FlatList, StyleSheet} from "react-native";
import ListItem from "./ListItem";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import PercentageBar from "../../components/PercentageBar";

const ParticipantList = (props) => {
    const [newParticipantId, setNewParticipantId] = useState("");

    const {loading, error, data} = useQuery(PARTICIPANTS_IN_SESSION_QUERY, {
        variables: {"id": props.sessionId},
    });

    const onNewParticipantArrivedCallback = ({client, subscriptionData}) => {
        const newParticipantArrivedData = subscriptionData && subscriptionData.data && subscriptionData.data.newParticipantArrived;
        client.writeQuery({
            query: PARTICIPANTS_IN_SESSION_QUERY,
            variables: {"id": props.sessionId},
            data: {
                session: {
                    ...data.session,
                    participants: [
                        newParticipantArrivedData,
                        ...data.session.participants
                    ]
                }
            }
        });
        setNewParticipantId(newParticipantArrivedData.id);
    };
    const onVoteGivenCallback = ({client, subscriptionData}) => {
        const voteGiven = subscriptionData && subscriptionData.data && subscriptionData.data.voteGiven;

        const manipulateData = (data) => {

            let participants = [...data.session.participants];
            let foundedIndex = -1;
            participants.forEach((participant, index) => {
                if(participant.id === voteGiven.participant.id){
                    foundedIndex = index;
                }
            })
            const deepCopy = {
                ...data
            };

            if(foundedIndex >= 0)
            {
                deepCopy.session.participants[foundedIndex] = {
                    ...deepCopy.session.participants[foundedIndex],
                    vote: voteGiven
                }
            }

            return deepCopy;
        }

        client.writeQuery({
            query: PARTICIPANTS_IN_SESSION_QUERY,
            variables: {"id": props.sessionId},
            data: manipulateData(data)
        });
    }
    useSubscription(NEW_PARTICIPANT_ARRIVED_SUBSCRIPTION, {
        variables: {
            sessionId: props.sessionId
        },
        onSubscriptionData: onNewParticipantArrivedCallback
    });
    useSubscription(VOTE_GIVEN_SUBSCRIPTION,{
        variables: {
            sessionId: props.sessionId
        },
        onSubscriptionData: onVoteGivenCallback
    });

    if (loading) return <Loading text="Loading..."/>
    if (error) return <Error text={String(error)}/>

    return (
        <View style={styles.container}>
            <View style={styles.percentageArea}>
                <PercentageBar participantList={data.session.participants}/>
            </View>
            <FlatList
                data={data.session.participants}
                renderItem={({item}) => <ListItem isNewParticipant={item.id.toString() === newParticipantId}
                                                  item={item}/>}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    percentageArea: {
        display: 'flex',
        height: 30,
        justifyContent: 'center',
        marginBottom: 3
    }
});

export default ParticipantList;
