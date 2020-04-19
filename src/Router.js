import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//screens
import AttendPoker from './screens/AttendPoker/AttendPoker'
import PokerTable from './screens/PokerTable/PokerTable';
import StartPoker from "./screens/StartPoker/StartPoker";
import VotingResult from "./screens/VotingResult/VotingResult";

const HomeStack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer
            theme={{
                colors: {
                    background: '#fff',
                    card: '#004ab4',
                    text: '#fff',
                    primary: '#fff',
                },
            }}>
            <HomeStack.Navigator>
                <HomeStack.Screen
                    name="AttendPoker"
                    options={() => ({headerShown:false})}
                    component={AttendPoker} />
                <HomeStack.Screen
                    name="StartPoker"
                    options={() => ({title: "Start A Scrum Poker"})}
                    component={StartPoker} />
                <HomeStack.Screen
                    name="PokerTable"
                    component={PokerTable}
                    options={({route}) => ({
                        title:`Session: ${route.params.sessionNumber}`,
                        headerLeft: null
                    })} />
                <HomeStack.Screen
                    name="VotingResult"
                    options={() => ({title: "Voting Result"})}
                    component={VotingResult} />
            </HomeStack.Navigator>
        </NavigationContainer>
    );
}
