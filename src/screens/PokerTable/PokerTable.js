import React, { useState } from 'react';
import {View, Text, StyleSheet, } from 'react-native';
import {useMutation} from '@apollo/react-hooks';
import {ADD_VOTE_MUTATION} from './queries'
import CardDeck from "./CardDeck";
import ParticipantList from "./ParticipantList";
import LinearGradient from 'react-native-linear-gradient';
import FabActions from "./FabActions";
import { AdMobBanner } from 'react-native-admob';

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
                setIsVotingCompleted(true);
                setIsVotingStarted(false);
            })
            .catch((error) => {
                setIsVotingStarted(false);
            });
    };


    return (
        <>
            <View style={styles.container}>
                <View style={styles.notificationArea}>
                    <Text>Notification</Text>
                </View>
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
                </View>
                <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.votingStatusArea}>
                    <View style={styles.participantListArea}>
                        <ParticipantList
                            participantId={participantId}
                            sessionId={sessionId}/>
                    </View>
                </LinearGradient>
            </View>
            <View style={styles.adMobArea}>
                <AdMobBanner
                    adSize="banner"
                    adUnitID="ca-app-pub-3940256099942544/6300978111"
                    onAdFailedToLoad={error => console.error(error)} />
            </View>
            <FabActions/>
        </>
    );
};

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flex: 1,
    },
    notificationArea:{
        width:'100%',
        height: 50
    },
    cardArea:{
        backgroundColor: 'red',
        flex:4
    },
    votingStatusArea:{
        flex: 2,
        flexDirection: 'row'
    },
    participantListArea:{
        flex: 1,
        flexDirection: 'column'
    },
    cardAreaShowingCards:{
        flex:4,
        flexDirection: 'column',
    },
    adMobArea:{
        marginTop:1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }
});


export default PokerTable;
