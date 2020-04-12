import React, { useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useMutation} from '@apollo/react-hooks';
import {ADD_VOTE_MUTATION} from './queries'
import CardDeck from "./CardDeck";
import ParticipantList from "./ParticipantList";
import LinearGradient from 'react-native-linear-gradient';
import { Fab, Icon } from 'native-base';

const PokerTable = (props) => {
    const [selectedCard, setSelectedCard] = useState('none');
    const [isFabActive, setIsFabActive] = useState(false);
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
            <Fab
                active={isFabActive}
                onPress={() => setIsFabActive(!isFabActive)}
                direction="up"
                containerStyle={{marginRight: 40}}
                style={{marginRight: 40}}
                position="bottomRight">
                <Icon name="settings" />
            </Fab>
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
                <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.votingStatusArea}>
                    <View style={styles.participantListArea}>
                        <ParticipantList
                            participantId={participantId}
                            sessionId={sessionId}/>
                    </View>
                </LinearGradient>
            </View>
        </>
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
        flex: 1,
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
    cardAreaSelectedCardStatus:{
        flex: 1,
        backgroundColor: 'magenta'
    },
});


export default PokerTable;
