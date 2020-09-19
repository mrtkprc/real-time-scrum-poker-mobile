import React, { useState, useEffect } from 'react';
import { AppState, View, StyleSheet, BackHandler, Alert } from 'react-native';
import { useMutation, useSubscription } from '@apollo/react-hooks';
import CardDeck from "./CardDeck";
import ParticipantList from "./ParticipantList";
import LinearGradient from 'react-native-linear-gradient';
import FabActions from "./FabActions";
import { AdMobBanner } from 'react-native-admob';
import {ADD_VOTE_MUTATION, FORWARD_TEAM_TO_DEFINITE_SCREEN_SUBSCRIPTION} from './queries'
import {useNavigation} from "@react-navigation/native";
import NotificationArea from "./NotificationArea";

const PokerTable = (props) => {
    const [appState, setAppState] = useState(AppState.currentState);
    const [notificationText, setNotificationText] = useState("Welcome to Real Time Scrum Poker.");
    const [selectedCard, setSelectedCard] = useState('none');
    const [isVotingCompleted, setIsVotingCompleted] = useState(false);

    const { sessionId, participantId, isManager } = props.route.params;

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        AppState.addEventListener("change", _handleAppStateChange);
        console.log("PokerTable Mounted");
        return () => {
            console.log("PokerTable Unmounted");
            AppState.removeEventListener("change", _handleAppStateChange);
            backHandler.remove();
        };
    }, []);
    const navigation = useNavigation();

    const [addVote] = useMutation(ADD_VOTE_MUTATION);
    const onForwardTeamToDefiniteScreen = ({subscriptionData}) => {
        const resultData = subscriptionData && subscriptionData.data && subscriptionData.data.forwardTeamToDefiniteScreenSubscription && JSON.parse(subscriptionData.data.forwardTeamToDefiniteScreenSubscription.replace("\\",""));
        if(resultData && resultData.screenName && resultData.delayDuration)
        {
            if(resultData.screenName !== "PokerTable" )
            {
                setNotificationText(`Your team will be forwarded to Result Screen in ${resultData.delayDuration} seconds`);
                setTimeout(() => {
                    navigation.navigate(resultData.screenName,{
                        sessionId,
                        isManager: String(isManager) === "1"
                    });
                }, (parseInt(resultData.delayDuration) * 1000));
            }
            else if(resultData.screenName === "PokerTable")
            {
                const navigationDangState = navigation.dangerouslyGetState();
                const routeIndexCount = navigationDangState.routes.length;
                const lastRoute =  navigationDangState.routes[routeIndexCount-1].name;
                setTimeout(() => {
                    if(navigation.canGoBack() && lastRoute === "VotingResult"){
                        setNotificationText(`New voting started.`);
                        navigation.goBack()
                    }
                }, (parseInt(resultData.delayDuration) * 1000));
            }


        }
    }

    useSubscription(FORWARD_TEAM_TO_DEFINITE_SCREEN_SUBSCRIPTION,{
        variables: {
            sessionId
        },
        onSubscriptionData:onForwardTeamToDefiniteScreen
    });

    const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to exit?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "Yes, Let's exit.", onPress: () => BackHandler.exitApp() }
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
                <NotificationArea notificationText={notificationText}/>
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
                            setNotificationText={setNotificationText}
                            setSelectedCard={setSelectedCard}
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
                isManager && String(isManager) === "1" ? <FabActions sessionId={sessionId}/>: <></>
                //true ? <FabActions sessionId={sessionId}/>: <></>

            }

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
