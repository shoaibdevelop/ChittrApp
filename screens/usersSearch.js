
 import React, { useState } from 'react';
 import 'react-native-gesture-handler';
 import '../globals/GlobalVariables';
 import { createDrawerNavigator } from '@react-navigation/drawer';
 import { NavigationContainer } from '@react-navigation/native';


 import {
   FlatList,
   Text,
   View,
   StyleSheet,
   Image,
   TextInput,
   TouchableOpacity,
   TouchableWithoutFeedback,
   Alert,
 } from 'react-native';
import ProfileScreen from './profile';

import AsyncStorage from '@react-native-community/async-storage';

class UsersSearchScreen extends React.Component {
    
    constructor(props) {
        super(props);
    }

    state = {
      userId: "",
      isLoading: true,
      users: [],
    };
  
    componentDidMount() { }

    openProfile = () => { 
        this.props.navigation.navigate('Profile');
    }

    searchUer = (text) => {
        console.log(text)
        if (text == "") {
            this.setState({
                users: [],
            })
            return
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        };

        fetch("http://192.168.100.43:3333/api/v0.0.5/search_user?q=" + text, requestOptions)
        .then(response => {
            response.json()
            .then((users) => {
                this.setState({
                    users: users,
                })
            })
        })
        .catch(error => console.log('error', error));
    }

    _renderItem = ({item}) => (
        <TouchableWithoutFeedback onPress={() => {
            this.props.navigation.navigate('UserProfile', {
              userId: item.user_id,
            });
          }}>
            <View style={styles.card}>
                <View style={styles.cardContent}> 
                
                    <Text style={styles.head}>{item.given_name}</Text>
                    <Text style={styles.item}>{item.email}</Text>
                
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    render() {
      console.log('Render lifecycle')
      return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.cardContent1}>
                    <TextInput
                            style={styles.TextInput}
                            placeholder="Enter user name to search"
                            placeholderTextColor="#003f5c"
                            onChangeText={(text) => this.searchUer(text)}></TextInput>
                </View>
            </View>

            <FlatList
                data={this.state.users}
                renderItem={this._renderItem}
                keyExtractor={(item,index) => index}
            />

        
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    head: {
        padding: 0,
        fontSize: 15,
        height: 25,
        color: "#00BFFF",
        
        fontWeight: 'bold',
    },
    item: {
      padding: 0,
      fontSize: 14,
      height: 20,
      color: "#696969",
    },
    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1},
        shadowColor:'#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 10,
    },
    cardContent1: {
        marginHorizontal: 18,
        marginVertical: 0,
    }
  });

export default UsersSearchScreen;