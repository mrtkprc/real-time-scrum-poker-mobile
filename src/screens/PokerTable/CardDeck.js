import React from 'react';
import Card from "../../components/Card";
import {StyleSheet, View} from "react-native";

const CardDeck = (props) => {
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
                    isVotingCompleted={props.isVotingCompleted}
                    isCardSelected={props.selectedCard === currentCard}
                    cardPressed={props.cardPressed}
                    key={"SP"+currentCard}
                    point={currentCard}/>
            );
        }
        cards.push(<View key={"CardRow"+i} style={styles.cardShowingAreaBaseRow}>{cardsInRow}</View>)
    }
    return (
        cards
    );
};


const styles = StyleSheet.create({
    cardShowingAreaBaseRow:{
        alignItems: 'center',
        justifyContent:'space-around',
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#03d3fc'
    }
});

export default CardDeck;

