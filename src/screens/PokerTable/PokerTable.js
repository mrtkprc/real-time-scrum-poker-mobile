import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Card from '../../components/Card';
const PokerTable = (props) => {
    const cardPointsRow1 = ["0","0.5","1","2"];
    const cardPointsRow2 = ["3","5","8","13"];
    const cardPointsRow3 = ["20","40","100","inf"];
    const cardPointsRow4 = ["Q", "B"];

    const onPress = () => {

    };

    return (
        <View style={styles.container}>
            <View style={styles.cardArea}>
                <View style={styles.cardAreaShowingCards}>
                    <View style={styles.cardShowingAreaBaseRow}>
                        {
                            cardPointsRow1.map((item) => <Card onPress={onPress} key={"SP"+item} point={item}/>)
                        }
                    </View>
                    <View style={styles.cardShowingAreaBaseRow}>
                        {
                            cardPointsRow2.map((item) => <Card key={"SP"+item} point={item}/>)
                        }
                    </View>
                    <View style={styles.cardShowingAreaBaseRow}>
                        {
                            cardPointsRow3.map((item) => <Card key={"SP"+item} point={item}/>)
                        }
                    </View>
                    <View style={styles.cardShowingAreaBaseRow}>
                        {
                            cardPointsRow4.map((item) => <Card key={"SP"+item} point={item}/>)
                        }
                    </View>
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
    },
    cardShowingAreaBaseRow:{
        alignItems: 'center',
        justifyContent:'space-around',
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'red'
    },
});

export default PokerTable;

