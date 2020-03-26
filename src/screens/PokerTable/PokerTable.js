import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Card from '../../components/Card';

export default class PokerTable extends Component {
    state = {selectedCard: 'Q'};

    cardPressed = (data) => {
        this.setState({
            selectedCard: data
        });
    };

    composeCards() {
        const cards = [];
        const cardPoints = ["0","0.5","1","2","3","5","8","13","20","40","100","inf","Q", "B"];
        const ROW_COUNT = 4;
        const CARD_COUNT_EACH_ROW = 4;
        let cardsInRow = [];
        let currentCardIndex;
        let currentCard;
        for(let i = 0; i < ROW_COUNT ; i++){
            cardsInRow = [];

            for (let j = 0; j < CARD_COUNT_EACH_ROW; j++) {
                currentCardIndex = i * CARD_COUNT_EACH_ROW + j;

                if(currentCardIndex >= cardPoints.length)
                    break;
                currentCard = cardPoints[currentCardIndex];
                cardsInRow.push(<Card isCardSelected={this.state.selectedCard === currentCard} cardPressed={this.cardPressed} key={"SP"+currentCard} point={currentCard}/>);
            }
            cards.push(<View key={"CardRow"+i} style={styles.cardShowingAreaBaseRow}>{cardsInRow}</View>)
        }
        return cards;
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cardArea}>
                    <View style={styles.cardAreaShowingCards}>
                        {
                            this.composeCards()
                        }
                    </View>
                    <View style={styles.cardAreaSelectedCardStatus}>
                        <Text>Selected Card Status</Text>
                    </View>
                </View>
                <View style={styles.votingStatusArea}>
                    <Text>Voting Area Status</Text>
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
    },
    cardShowingAreaBaseRow:{
        alignItems: 'center',
        justifyContent:'space-around',
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'red'
    },
});
