
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

  class UserProfileScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: 0,
            currentId: 0,
            isFollowed: false,
            token: "",
            userData: {},
        };    
    }

    _retrieveCurrentUserId = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('userId')
          jsonValue != null ? JSON.stringify(jsonValue) : null
          this.state.currentId = jsonValue;
          
          console.log(this.state.userId);
        } catch(e) {
          // read error
          console.log(e)
        }
      
        this._retrieveUserId();
    }

    _retrieveUserId = async () => {
        var userid = this.props.route.params.userId;
        console.log(userid)
        this.state.userId = userid;
    
        this.getUserData();
    }

    _retrieveToken = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('token')
          jsonValue != null ? JSON.stringify(jsonValue) : null

          this.setState({
              token: jsonValue
          });
          
          console.log("session state:" + this.state.token);
          
        } catch(e) {
          // read error
          console.log(e)
        }
      
        console.log('Done.')
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
                    });
                    this.getFollowers();
                })
                .catch(error => console.log('error', error));
            })
            .catch(error => console.log('error', error));
      }

    getFollowers() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("http://192.168.100.43:3333/api/v0.0.5/user/" + this.state.userId + "/followers", requestOptions)
            .then(response => {
                response.json()
                .then((followers) => {
                    console.log(followers.length);
                    for (let i=0; i<followers.length; i++) {
                        const follower = followers[i]             
                        if (this.state.currentId == follower.user_id) {
                            this.setState({
                                isFollowed:  true,
                            });
                        }
                    }
                });
            })
            .catch(error => console.log('error', error));
    }

    componentDidMount() {
      console.log('componentDidMount() lifecycle')
      this._retrieveToken();
      this._retrieveCurrentUserId();
    }

    followUser = () => { 
        console.log(this.state.token);

        var myHeaders = new Headers();
        myHeaders.append("X-Authorization", this.state.token);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        };

        fetch("http://192.168.100.43:3333/api/v0.0.5/user/" + this.state.userId + "/follow", requestOptions)
        .then(response => response.text())
        .then(result => {
            this.setState({
                isFollowed: true,
            });
        })
        .catch(error => console.log('error', error));
    } 

    unFollowUser = () => { 
        console.log(this.state.token);

        var myHeaders = new Headers();
        myHeaders.append("X-Authorization", this.state.token);

        var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("http://192.168.100.43:3333/api/v0.0.5/user/" + this.state.userId + "/follow", requestOptions)
        .then(response => response.text())
        .then(result => {
            this.setState({
                isFollowed: false,
            });
        })
        .catch(error => console.log('error', error));
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
                            
                            
                            {!this.state.isFollowed ? (
                                <TouchableOpacity style={styles.buttonContainer} onPress={this.followUser}>
                                    <Text>Follow</Text>  
                                </TouchableOpacity>
                                    ) : null}

                            
                            {this.state.isFollowed ? (
                                <TouchableOpacity style={styles.buttonContainer} onPress={this.unFollowUser}>
                                    <Text>Unfollow</Text>  
                                </TouchableOpacity>
                                    ) : null}
                            
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
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#00BFFF",
      },
    });

export default UserProfileScreen;