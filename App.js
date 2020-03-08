import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Item, Input, Header, Thumbnail, Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
class App extends Component {
  state = {};
  render() {
    const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png"
    return (
        <Container style={styles.container}>
            <Header/>
            <Content>
                <Thumbnail style={styles.logo} large source={{uri: uri}} />
                <Item style={styles.sessionNumberItem} rounded>
                    <Input maxLength={6} style={styles.sessionNumberInput} keyboardType='number-pad' placeholder='Session Number'/>
                </Item>
                <Item style={styles.fullNameItem} regular>
                    <Icon style={{marginLeft: 10}} size={48} color='orange' active name='user' />
                    <Input style={styles.fullNameInput} placeholder='Full Name'/>
                </Item>
            </Content>
        </Container>
    );
  }
}


export default App;


const styles = StyleSheet.create({
    container:{
        display: 'flex'
    },
    logo: {
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    sessionNumberItem:{
        marginTop: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '60%'
    },
    sessionNumberInput:{
        textAlign: 'center',
        fontSize: 24,
    },
    fullNameItem:{
        marginTop: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
        borderColor: 'red',
        borderWidth: 3
    },
    fullNameInput:{
        textAlign: 'center',
        fontSize: 24,
    },



});
