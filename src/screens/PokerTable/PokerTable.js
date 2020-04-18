import React, { useState, useEffect } from 'react';
import { AppState, View, Text, StyleSheet, ScrollView, BackHandler, Alert } from 'react-native';
import { useMutation, useSubscription } from '@apollo/react-hooks';
import {ADD_VOTE_MUTATION} from './queries'
import CardDeck from "./CardDeck";
import ParticipantList from "./ParticipantList";
import LinearGradient from 'react-native-linear-gradient';
import FabActions from "./FabActions";
import { AdMobBanner } from 'react-native-admob';
import {FORWARD_TEAM_TO_RESULT_SCREEN_SUBSCRIPTION} from './queries'

const PokerTable = (props) => {
    const [appState, setAppState] = useState(AppState.currentState);
    const [selectedCard, setSelectedCard] = useState('none');
    const [isVotingCompleted, setIsVotingCompleted] = useState(false);

    const { sessionId, participantId, isManager } = props.route.params;

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        AppState.addEventListener("change", _handleAppStateChange);

        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
            backHandler.remove();
        };
    }, []);

    const [addVote] = useMutation(ADD_VOTE_MUTATION);
    const onForwardTeamToResultScreen = ({client, subscriptionData}) => {
        console.log("Subscription Data", subscriptionData);
    }
    useSubscription(FORWARD_TEAM_TO_RESULT_SCREEN_SUBSCRIPTION,{
        variables: {
            sessionId
        },
        onSubscriptionData:onForwardTeamToResultScreen
    })


    const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };
    const cardPressed = (vote) => {
        setIsVotingCompleted(false);
        setSelectedCard(vote);
        addVote({variables:{vote, sessionId, participantId}})
            .then((data) => {
                setIsVotingCompleted(true);
            })
            .catch((error) => {
            });
    };

    const _handleAppStateChange = nextAppState => {
        if (nextAppState === "active") {
            console.log("App has come to the foreground!");
        }
        else if(nextAppState === "background"){
            console.log("App has gone to the background!");
        }

        setAppState(nextAppState);
    };

    return (
        <>
            <View style={styles.container}>
                <LinearGradient colors={['#cfd9df', '#e2ebf0']} style={styles.notificationArea}>
                    <ScrollView>
                        <Text>Notifications...</Text>
                    </ScrollView>
                </LinearGradient>
                <View style={styles.cardArea}>
                    <View style={styles.cardAreaShowingCards}>
                        <CardDeck
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
                            isManager={String(isManager) === "1"}
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
            {
                isManager && String(isManager) === "1" ? <FabActions/>: <></>
            }

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
        height: 50,
        paddingLeft: 5,
        paddingTop: 5
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
        backgroundColor: '#333',
        marginTop:1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }
});


export default PokerTable;
