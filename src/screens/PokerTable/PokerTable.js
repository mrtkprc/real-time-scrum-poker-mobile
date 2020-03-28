import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Card from '../../components/Card';
import ListItem from "./ListItem";

export default class PokerTable extends Component {
    state = {selectedCard: 'Q'};

    cardPressed = (data) => {
        this.setState({
            selectedCard: data
        });
    };

    composeCards() {
        const cards = [];
        const cardPoints = ["0","0.5","1","2","3","5","8","13","20","40","100","Inf","Q", "C"];
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
                cardsInRow.push(
                    <Card
                        isImage={currentCard === 'Q' || currentCard === 'C' || currentCard === 'Inf'}
                        isCardSelected={this.state.selectedCard === currentCard}
                        cardPressed={this.cardPressed}
                        key={"SP"+currentCard}
                        point={currentCard}/>
                );
            }
            cards.push(<View key={"CardRow"+i} style={styles.cardShowingAreaBaseRow}>{cardsInRow}</View>)
        }
        return cards;
    };

    render() {
        const data = [{id: 1, username:"mrtkprc"},{id: 2, username:"emre"},{id: 3, username:"kaan"},{id: 4, username:"oytun"}];
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
                    <FlatList
                        data={data}
                        renderItem={({item}) => <ListItem item={item}/> }
                        keyExtractor={item => item.id.toString()}
                    />
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
        backgroundColor: '#03d3fc'
    },
});
