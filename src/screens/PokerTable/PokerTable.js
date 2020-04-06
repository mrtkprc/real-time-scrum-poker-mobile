import React, { useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CardDeck from "./CardDeck";
import ParticipantList from "./ParticipantList";

const PokerTable = (props) => {
    const [selectedCard, setSelectedCard] = useState('none');

    const cardPressed = (data) => {
        setSelectedCard(data);
    };

    const { sessionId } = props.route.params;

    return (
        <View style={styles.container}>
            <View style={styles.cardArea}>
                <View style={styles.cardAreaShowingCards}>
                    <CardDeck
                        cardPressed={cardPressed}
                        selectedCard={selectedCard}/>
                </View>
                <View style={styles.cardAreaSelectedCardStatus}>
                    <Text>Selected Card Status</Text>
                </View>
            </View>
            <View style={styles.votingStatusArea}>
                <ParticipantList sessionId={sessionId}/>
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
