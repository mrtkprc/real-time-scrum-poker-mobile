import React from 'react';
import {Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
const ListItem = (props) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Text style={styles.name}>
                {props.item.username}
            </Text>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#f1f1f1',
    },
    image: {
        width: 100,
        height: 100,
    },
    name: {
        fontSize: 24,
        marginLeft: 15,
    },
});
export default ListItem;
