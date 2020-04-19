import React from 'react';
import { View, Text, Button, Dimensions } from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {PieChart} from "react-native-chart-kit";

//bullhorn megafon simgesi için
const VotingResult = (props) => {
    const navigation = useNavigation();
    const screenWidth = Dimensions.get('window').width;
    const chartConfig = {
        backgroundColor: '#26872a',
        backgroundGradientFrom: '#43a047',
        backgroundGradientTo: '#66bb6a',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        }
    };
    const data = [
        {
            name: "Seoul",
            population: 21500000,
            color: "rgba(131, 167, 234, 1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Toronto",
            population: 2800000,
            color: "#F00",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Beijing",
            population: 527612,
            color: "red",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "New York",
            population: 8538000,
            color: "#ffffff",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Moscow",
            population: 11920000,
            color: "rgb(0, 0, 255)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    ];
    return (
        <View>
            <PieChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="#999"
                paddingLeft="15"
                absolute
            />
            <Text>Voting Result</Text>
            <Button title={"Go Back"} onPress={() => navigation.goBack() }/>
        </View>
    );
};

export default VotingResult;
