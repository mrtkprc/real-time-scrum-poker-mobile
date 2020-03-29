import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import ListItem from "./ListItem";
import CardDeck from "./CardDeck";
import { Query } from 'react-apollo';
import {PARTICIPANTS_IN_SESSION_QUERY} from './queries'
export default class PokerTable extends Component {
    state = {selectedCard: 'Q'};

    cardPressed = (data) => {
        this.setState({
            selectedCard: data
        });
    };

    render() {

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
                    <Query
                        variables={{"id":  "5e7dfdfdea4ab4384f7b3bf1"}}
                        query={PARTICIPANTS_IN_SESSION_QUERY}>
                        {({ loading, error, data }) => {
                            if (loading) return <View><Text>Loading...</Text></View>
                            if (error) return  <ScrollView><Text>{JSON.stringify(error)}</Text></ScrollView>
                            return (
                                <FlatList
                                    data={data.session.participants}
                                    renderItem={({item}) => <ListItem item={item}/> }
                                    keyExtractor={item => item.nickname}
                                />
                            );
                        }}
                    </Query>
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
