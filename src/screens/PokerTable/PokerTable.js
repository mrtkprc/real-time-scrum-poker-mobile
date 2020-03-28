import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import ListItem from "./ListItem";
import CardDeck from "./CardDeck";

export default class PokerTable extends Component {
    state = {selectedCard: 'Q'};

    cardPressed = (data) => {
        this.setState({
            selectedCard: data
        });
    };

    render() {
        const data = [{id: 1, username:"mrtkprc"},{id: 2, username:"emre"},{id: 3, username:"kaan"},{id: 4, username:"oytun"}];
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
    cardAreaSelectedCardStatus:{
        flex: 1,
        backgroundColor: 'magenta'
    },
    cardAreaShowingCards:{
        flex:4,
        flexDirection: 'column',
    }
});
