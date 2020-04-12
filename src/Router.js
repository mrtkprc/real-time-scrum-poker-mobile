import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//screens
import AttendPoker from './screens/AttendPoker/AttendPoker'
import PokerTable from './screens/PokerTable/PokerTable';
import StartPoker from "./screens/StartPoker/StartPoker";

const HomeStack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer
            theme={{
                colors: {
                    background: '#fff',
                    card: '#5397ff',
                    text: '#fff',
                    primary: '#fff',
                },
            }}>
            <HomeStack.Navigator>
                <HomeStack.Screen
                    name="AttendPoker"
                    options={{title: "Real Time Scrum Poker"}}
                    component={AttendPoker} />
                <HomeStack.Screen
                    name="StartPoker"
                    component={StartPoker} />
                <HomeStack.Screen
                    name="PokerTable"
                    component={PokerTable}
                    options={({route}) => ({
                        title:`Session: ${route.params.sessionNumber}`,
                        headerLeft: null
                    })} />
            </HomeStack.Navigator>
        </NavigationContainer>
    );
}
