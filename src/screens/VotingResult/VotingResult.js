import React, {useState, useLayoutEffect} from 'react';
import {View, ScrollView, Text, Button, Image, FlatList} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {useQuery} from "@apollo/react-hooks";
import {VOTE_RESULTS_QUERY, VOTE_INDIVIDUAL_RESULTS} from './queries';
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import PieChartResult from "../StartPoker/PieChartResult";
import {findOutlierValues, findOutlierParticipantVotes} from "../../helpers/VoteResultHelper";

//bullhorn megafon simgesi için
const VotingResult = ({route}) => {
    const [highestValue, setHighestValue] = useState(13);
    const [lowestValue, setLowestValue] = useState(0.5);
    const [lowestValueParticipantList, setLowestValueParticipantList] = useState([]);
    const [highestValueParticipantList, setHighestValueParticipantList] = useState([]);
    const [isCoffeeShown, setIsCoffeeShown] = useState(true);
    const [isOutlierValuesFound, setIsOutlierValuesFound] = useState(false);
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
    {
        /*
         findOutlierValues(votes)
         .then((outlierValues) => {
            findOutlierParticipantVotes(votes, outlierValues[0], outlierValues[1])
                .then(result => {
                    console.log("Result: ", result);

                })
                .catch(error => console.log(error));

        })
         .catch(error => console.log(error))
          */
    }



    return (
        <ScrollView style={styles.container}>
            <PieChartResult data={data}/>
            <View style={styles.outlierValuesArea}>
                <View style={styles.outlierArea}>
                    <Text>{`Highest: ${highestValue}`}</Text>
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
                    <Text>{`Lowest: ${lowestValue}`}</Text>
                </View>
            </View>
            <View style={{alignItems: 'center', margin:5}}>
                <Text>Highest and Lowest Sides</Text>
            </View>
            <View style={styles.outlierParticipantsArea}>
                <View style={styles.outlierParticipantsForHighestArea}>
                    <Text>Highest</Text>
                </View>
                <View style={styles.outlierParticipantsForLowestArea}>
                    <Text>Lowest</Text>
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
        margin: 10
    },
    outlierParticipantsArea:{
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    outlierParticipantsForHighestArea:{
        padding: 5,
        flex:1,
        backgroundColor: 'red'
    },
    outlierParticipantsForLowestArea:{
        padding: 5,
        flex:1,
        backgroundColor: 'blue'
    },
    otherParticipantsArea:{
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
