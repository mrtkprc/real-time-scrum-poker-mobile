import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { PARTICIPANTS_IN_SESSION_QUERY, NEW_PARTICIPANT_ARRIVED_SUBSCRIPTION, VOTE_GIVEN_SUBSCRIPTION } from './queries'
import { View, FlatList, StyleSheet} from "react-native";
import ListItem from "./ListItem";
import { useForceUpdate } from "../../helpers/general";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import PercentageBar from "../../components/PercentageBar";


const ParticipantList = (props) => {
    const [newParticipantId, setNewParticipantId] = useState("");
    const [isSubscriptionAdjusted,setIsSubscriptionAdjusted] = useState(false);
    const {loading, error, data, subscribeToMore, refetch} = useQuery(PARTICIPANTS_IN_SESSION_QUERY, {
        variables: {"id": props.sessionId},
    });

    const forceUpdate = useForceUpdate();

    if(!isSubscriptionAdjusted){
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

        setIsSubscriptionAdjusted(true);

    }

    if(loading) return <Loading text="Loading..." />
    if(error) return <Error text={String(error)} />

    return (
        <View style={styles.container}>
            <View style={styles.percentageArea}>
                <PercentageBar participantList={data.session.participants}/>
            </View>
            <FlatList
                data={data.session.participants}
                renderItem={({item}) => <ListItem isNewParticipant={item.id.toString() === newParticipantId} item={item}/>}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
   container:{
       flex: 1,
       flexDirection:'column',
   },
   percentageArea:{
       display: 'flex',
       height: 30,
       justifyContent: 'center',
       marginBottom: 3
    }
});

export default ParticipantList;
