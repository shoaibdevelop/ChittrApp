
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

class FollowingScreen extends React.Component { 
    constructor(props) {
        super(props);
    }
    

    state = {
      userId: "",
      isLoading: true,
      followings: [],
    };
  
    componentDidMount() { 
        this._retrieveUserId();
    }

    _retrieveUserId = async () => {
        var userid = this.props.route.params.userId;
        console.log(userid)
        this.state.userId = userid;
    
        this.getFollowing();
    }

    getFollowing = () => { 
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("http://192.168.100.43:3333/api/v0.0.5/user/"+ this.state.userId +"/following", requestOptions)
            .then(response => {
                response.json()
                .then((followings) => {
                    console.log(followings);
                    this.setState({
                        followings: followings,
                    });
                })
            })
            .catch(error => console.log('error', error));
    }

    
    _renderItem = ({item}) => (
        <TouchableWithoutFeedback>
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
            {this.state.followings.length > 0 ? (
                <FlatList
                data={this.state.followings}
                renderItem={this._renderItem}
                keyExtractor={(item,index) => index}
                />  
            ) : null}

            {this.state.followings.length == 0 ? (
                <Text style={styles.centerText}> You are not following anyone</Text>
            ) : null}  
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    centerText: {
        textAlignVertical: 'center',
        alignItems: "center",
        justifyContent: "center",
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

export default FollowingScreen;