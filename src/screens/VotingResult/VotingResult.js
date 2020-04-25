import React, {useState, useLayoutEffect} from 'react';
import {View, ScrollView, Text, Button, Image, FlatList} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {useQuery} from "@apollo/react-hooks";
import {VOTE_RESULTS_QUERY, VOTE_INDIVIDUAL_RESULTS} from './queries';
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import PieChartResult from "../StartPoker/PieChartResult";
import {findOutlierValues, findOutlierParticipantVotes} from "../../helpers/VoteResultHelper";
import VoteResultListItem from "./VoteResultListItem";

//bullhorn megafon simgesi için
const VotingResult = ({route}) => {
    const [highestVote, setHighestVote] = useState(13);
    const [lowestVote, setLowestVote] = useState(0.5);
    const [lowestVoterList, setLowestVoterList] = useState([]);
    const [highestVoterList, setHighestVoterList] = useState([]);
    const [allVoterList, setAllVoterList] = useState([]);
    const [isCoffeeShown, setIsCoffeeShown] = useState(true);
    const [isOutlierValuesComputedFlag,setIsOutlierValuesComputedFlag] = useState(false);
    const navigation = useNavigation();
    //TODO:MK - route.params.sessionId
    //const {sessionId} = route.params;
    const {loading, error, data} = useQuery(VOTE_RESULTS_QUERY, {
        variables: {"sessionId": "5e971201cd920e37abb12447"},
    });

    const voteIndividualResults = useQuery(VOTE_INDIVIDUAL_RESULTS,{
        variables:{"id": "5e971201cd920e37abb12447"}
    });

    if (loading || voteIndividualResults.loading) return <Loading text={"Results are coming."}/>;
    if (error || voteIndividualResults.loading) return <Error text={"Error occurred."} />

    const votes = voteIndividualResults.data && voteIndividualResults.data.session.votes;
        if(!isOutlierValuesComputedFlag){
            console.log("Votes", JSON.stringify(votes));
         findOutlierValues(votes)
         .then((outlierValues) => {
            findOutlierParticipantVotes(votes, outlierValues[0], outlierValues[1])
                .then(result => {
                    setIsOutlierValuesComputedFlag(true);
                    setLowestVote(outlierValues[0]);
                    setHighestVote(outlierValues[1] === 1000 ? "Infinity": outlierValues[1]);
                    setLowestVoterList(result[0]);
                    setHighestVoterList(result[1]);
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
                    <Text>{`Lowest: ${lowestVote}`}</Text>
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
                    <Text>{`Highest: ${highestVote}`}</Text>
                </View>
            </View>
            <View style={{alignItems: 'center', margin:5}}>
                <Text>Lowest and Highest Sides</Text>
            </View>
            <View style={styles.outlierParticipantsArea}>
                <View style={styles.outlierParticipantsForLowestArea}>
                    <FlatList
                        data={lowestVoterList}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => <VoteResultListItem backgroundColors={[]}  nickname={item.nickname} vote={item.vote} />} />
                </View>
                <View style={styles.outlierParticipantsForHighestArea}>
                    <FlatList
                        data={highestVoterList}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => <VoteResultListItem backgroundColors={[]}  nickname={item.nickname} vote={item.vote} />} />
                </View>
            </View>
            <View style={{alignItems: 'center', margin:5}}>
                <Text>All Participants</Text>
            </View>
            <View style={styles.otherParticipantsArea}>
                <View><Text>Other Participants</Text></View>
            </View>
            <View style={styles.buttonArea}>
                <View style={{flex:1, margin: 5}}><Button title={"Go Back"} onPress={() => navigation.goBack() }/></View>
                <View style={{flex:1, margin: 5}}><Button title={"Start New Voting"} onPress={() => navigation.goBack() }/></View>
            </View>
        </ScrollView>
    );
};

const styles = {
    container:{
        flex:1,
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
        height: 50,
        paddingLeft: 10,
        marginBottom: 5,
        backgroundColor: 'orange'
    },
    buttonArea:{
        flexDirection: 'row',
        backgroundColor: 'pink'
    }
}

export default VotingResult;
