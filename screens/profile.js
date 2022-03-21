
 import React, { useState, Component } from 'react';
 import 'react-native-gesture-handler';
 import '../globals/GlobalVariables';
 
 
 import {
   SafeAreaView,
   StatusBar,
   ScrollView,
   Text,
   View,
   StyleSheet,
   Image,
   TextInput,
   Button,
   TouchableOpacity,
   Alert,
 } from 'react-native';

 import AsyncStorage from '@react-native-community/async-storage';

  class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: 0,
            userData: {},
        };    
    }

    _retrieveUserId = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('userId')
          jsonValue != null ? JSON.stringify(jsonValue) : null
          this.state.userId = jsonValue;
          
          console.log(this.state.userId);
        } catch(e) {
          // read error
          console.log(e)
        }
      
        this.getUserData();
    }

    getUserData() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("http://192.168.100.43:3333/api/v0.0.5/user/" + this.state.userId, requestOptions)
            .then(response => {
                response.json()
                .then((userData) => {
                    this.setState({
                        userData: userData,
                    })
                })
                .catch(error => console.log('error', error));
            })
            .catch(error => console.log('error', error));
      }

    openFollowers = () => { 
        this.props.navigation.navigate('Followers', {userId: this.state.userId});
    } 

    openFollowing = () => {
        this.props.navigation.navigate('Following', {userId: this.state.userId})
    }

    componentDidMount() {
      console.log('componentDidMount() lifecycle')
      this._retrieveUserId();
    }
  
    render() {
      return (
        <SafeAreaView>
            <StatusBar style="auto" />
            <ScrollView>

                <View>
                    <View style={styles.container}>
                        <View style={styles.header}></View>
                        <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
                        <View style={styles.body}>
                            <View style={styles.bodyContent}>
                            <Text style={styles.name}>{this.state.userData.given_name}</Text>
                            <Text style={styles.info}>{this.state.userData.email}</Text>

                            <TouchableOpacity style={styles.buttonContainer} onPress={this.openFollowers}>
                                    <Text>Followers</Text>  
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonContainer} onPress={this.openFollowing}>
                                    <Text>Following</Text>  
                            </TouchableOpacity>
                        </View>

                        


                        </View>
                    </View>
                
                </View>
            </ScrollView>
        </SafeAreaView>
      )
    }
  }
  
  const styles = StyleSheet.create({
    header:{
        backgroundColor: "#00BFFF",
        height:200,
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:130
      },
      name:{
        fontSize:22,
        color:"#FFFFFF",
        fontWeight:'600',
      },
      body:{
        marginTop:40,
      },
      bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding:30,
      },
      name:{
        fontSize:28,
        color: "#696969",
        fontWeight: "600"
      },
      info:{
        fontSize:16,
        color: "#00BFFF",
        marginTop:10
      },
      description:{
        fontSize:16,
        color: "#696969",
        marginTop:10,
        textAlign: 'center'
      },
      buttonContainer: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:5,
        width:250,
        borderRadius:30,
        backgroundColor: "#00BFFF",
      },
    });

export default ProfileScreen;