import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CardDeck from "./CardDeck";
import ParticipantList from "./ParticipantList";

export default class PokerTable extends Component {
    state = {selectedCard: 'Q'};

    cardPressed = (data) => {
        this.setState({
            selectedCard: data
        });
    };

    render() {
        const {sessionId} = this.props.route.params;
        return (
            <View style={styles.container}>
                <View style={styles.cardArea}>
                    <View style={styles.cardAreaShowingCards}>
                        <CardDeck
                            cardPressed={this.cardPressed}
                            selectedCard={this.state.selectedCard}/>
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
    }
}

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
