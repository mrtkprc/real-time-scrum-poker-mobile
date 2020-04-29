import React, {useState, useLayoutEffect} from 'react';
import {View, ScrollView, Text, Button, Image, FlatList, Alert} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {useQuery, useMutation} from "@apollo/react-hooks";
import {VOTE_RESULTS_QUERY, VOTE_INDIVIDUAL_RESULTS, DELETE_ALL_VOTES} from './queries';
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import PieChartResult from "../StartPoker/PieChartResult";
import {findOutlierValues, findOutlierParticipantVotes} from "../../helpers/VoteResultHelper";
import VoteResultListItem from "./VoteResultListItem";
import Toast from "react-native-root-toast";
import {FORWARD_TEAM_TO_DEFINITE_SCREEN_MUTATION} from "../PokerTable/queries";

//bullhorn megafon simgesi için
const VotingResult = ({route}) => {
    const [highestVote, setHighestVote] = useState(0);
    const [lowestVote, setLowestVote] = useState(0);
    const [lowestVoterList, setLowestVoterList] = useState([]);
    const [highestVoterList, setHighestVoterList] = useState([]);
    const [allVoterList, setAllVoterList] = useState([]);
    const [isCoffeeShown, setIsCoffeeShown] = useState(true);
    const [deleteAllVotesOnSession] = useMutation(DELETE_ALL_VOTES);
    const [forwardTeamToResultScreen] = useMutation(FORWARD_TEAM_TO_DEFINITE_SCREEN_MUTATION);
    const [isOutlierValuesComputedFlag,setIsOutlierValuesComputedFlag] = useState(false);
    const navigation = useNavigation();

    const {sessionId} = route.params;
    const {loading, error, data} = useQuery(VOTE_RESULTS_QUERY, {
        variables: {sessionId},
    });
    const voteIndividualResults = useQuery(VOTE_INDIVIDUAL_RESULTS,{
        variables:{"id": sessionId}
    });
    const goBackPressed = () => {

        Alert.alert("Are you sure?", "Go Back?. You can't come anymore here for this voting.", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            {
                text: "Definitely. Go Back.",
                onPress: () => {
                    if(navigation.canGoBack())
                        navigation.goBack();
                }
            }
        ], {cancelable: true});
        return true;

    };
    const startNewVotingPressed = () => {
        Alert.alert("Are you sure?", "Current voting will be over and start new voting?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            {
                text: "Yes, Start New Voting.",
                onPress: async () => {
                    Toast.show("Your Team will be forwarded to Poker Table in short time.", {duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM});
                    const resultDeletingVotes = await deleteAllVotesOnSession({
                        variables:{
                            sessionId
                        }
                    });
                    const resultForwardingPokerTable = await forwardTeamToResultScreen({
                        variables:{
                            sessionId,
                            screenName: 'PokerTable',
                            delayDuration: 2
                        }
                    });
                }
            }
        ], {cancelable: true});
        return true;
    };
    if (loading || voteIndividualResults.loading) return <Loading text={"Results are coming."}/>;
    if (error || voteIndividualResults.loading) return <Error text={"Error occurred."} />

    const votes = voteIndividualResults.data && voteIndividualResults.data.session.votes;
        if(!isOutlierValuesComputedFlag){
         findOutlierValues(votes)
         .then((outlierValues) => {
            findOutlierParticipantVotes(votes, outlierValues[0], outlierValues[1])
                .then(result => {
                    setIsOutlierValuesComputedFlag(true);
                    setLowestVote(outlierValues[0]);
                    setHighestVote(outlierValues[1] === 1000 ? "Infinity": outlierValues[1]);
                    setLowestVoterList(result[0]);
                    setHighestVoterList(result[1]);
                    setAllVoterList(votes);
                })
                .catch(error => console.log(error));

        })
         .catch(error => console.log(error))
        }

    return (
        <ScrollView style={styles.container}>
            <PieChartResult data={data}/>
            <View style={styles.outlierValuesArea}>
                <View style={styles.outlierArea}>
                    <Text style={{fontWeight: 'bold', fontSize: 16, color: '#3b3b3b', fontFamily: 'Roboto'}}>{`Lowest: ${lowestVote}`}</Text>
                </View>
                {
                    isCoffeeShown
                    ?
                    <View>
                        <Image style={{width:32, height:32}} source={require('../../../assets/images/C.png')}/>
                    </View>
                    :
                    <></>
                }
                <View style={styles.outlierArea}>
                    <Text style={{fontWeight: 'bold', fontSize: 16, color: '#3b3b3b', fontFamily: 'Roboto'}}>{`Highest: ${highestVote}`}</Text>
                </View>
            </View>
            <View style={{alignItems: 'center', margin:5}}>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: '#6c6c6c', fontFamily: 'Roboto'}}>Lowest and Highest Sides</Text>
            </View>
            <View style={styles.outlierParticipantsArea}>
                <View style={styles.outlierParticipantsForLowestArea}>
                    <FlatList
                        data={lowestVoterList}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => <VoteResultListItem colors={["#f5f7fa","#c3cfe2"]}  nickname={item.nickname} vote={item.vote} />} />
                </View>
                <View style={styles.outlierParticipantsForHighestArea}>
                    <FlatList
                        data={highestVoterList}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => <VoteResultListItem colors={["#f5f7fa","#c3cfe2"]}  nickname={item.nickname} vote={item.vote} />} />
                </View>
            </View>
            <View style={{alignItems: 'center', margin:10}}>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: '#797979', fontFamily: 'Roboto'}}>All Participants</Text>
            </View>
            <View style={styles.otherParticipantsArea}>
                <View>
                    <FlatList
                        data={allVoterList}
                        keyExtractor={item => "AllVoters"+String(item.participant.vote.id)}
                        renderItem={({item:{participant}}) => <VoteResultListItem colors={["#f5f7fa","#c3cfe2"]}  nickname={participant.nickname} vote={participant.vote.vote} />} />
                </View>
            </View>
            <View style={styles.buttonArea}>
                <View style={{flex:1, margin: 5}}><Button title={"Go Back"} onPress={goBackPressed}/></View>
                {
                    route && route.isManager
                        ?
                    <View style={{flex:1, margin: 5}}><Button title={"Start New Voting"} onPress={startNewVotingPressed }/></View>
                        :
                    <></>
                }
            </View>
        </ScrollView>
    );
};

const styles = {
    container:{
        flex:1,
        backgroundColor: 'rgba(179,179,179,0.1)'
    },
    outlierValuesArea:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    outlierArea:{
        margin: 10,
        flexDirection: 'row'
    },
    outlierParticipantsArea:{
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        height: 60
    },
    outlierParticipantsForLowestArea:{
        padding: 5,
        flex:1,
    },
    outlierParticipantsForHighestArea:{
        padding: 5,
        flex:1,
    },
    otherParticipantsArea:{
        height: 70,
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    buttonArea:{
        flexDirection: 'row',
    }
}

export default VotingResult;
