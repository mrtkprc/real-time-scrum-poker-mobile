import React, { useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useMutation} from '@apollo/react-hooks';
import {ADD_VOTE_MUTATION} from './queries'
import CardDeck from "./CardDeck";
import ParticipantList from "./ParticipantList";

const PokerTable = (props) => {
    const [selectedCard, setSelectedCard] = useState('none');
    const [isVotingCompleted, setIsVotingCompleted] = useState(false);
    const [isVotingStarted, setIsVotingStarted ] = useState(false);
    const [addVote] = useMutation(ADD_VOTE_MUTATION);
    const { sessionId, participantId } = props.route.params;

    const cardPressed = (vote) => {
        setIsVotingStarted(true);
        setIsVotingCompleted(false);
        setSelectedCard(vote);
        addVote({variables:{vote, sessionId, participantId}})
            .then((data) => {
                console.log(data);
                setIsVotingCompleted(true);
                setIsVotingStarted(false);
            })
            .catch((error) => {
                setIsVotingStarted(false);
            });

    };


    return (
        <View style={styles.container}>
            <View style={styles.cardArea}>
                <View style={styles.cardAreaShowingCards}>
                    <CardDeck
                        isVotingStarted={isVotingStarted}
                        isVotingCompleted={isVotingCompleted}
                        sessionId={sessionId}
                        participantId={participantId}
                        cardPressed={cardPressed}
                        selectedCard={selectedCard}/>
                </View>
                <View style={styles.cardAreaSelectedCardStatus}>
                    <Text>Selected Card Status</Text>
                </View>
            </View>
            <View style={styles.votingStatusArea}>
                <ParticipantList
                    participantId={participantId}
                    sessionId={sessionId}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flex: 1,
    },
    cardArea:{
        backgroundColor: 'red',
        flex:3
    },
    votingStatusArea:{
        backgroundColor: 'blue',
        flex: 1
    },
    cardAreaShowingCards:{
        flex:4,
        flexDirection: 'column',
    },
    cardAreaSelectedCardStatus:{
        flex: 1,
        backgroundColor: 'magenta'
    }
});


export default PokerTable;
