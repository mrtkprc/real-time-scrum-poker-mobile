import React from 'react';
import {ScrollView,Text} from 'react-native';
const Error = (props) => {
    return (
        <ScrollView>
            <Text>{props.text}</Text>
        </ScrollView>
    );
};


export default Error;
