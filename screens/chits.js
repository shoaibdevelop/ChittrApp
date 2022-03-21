
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
   TouchableOpacity,
   Alert,
 } from 'react-native';
import ProfileScreen from './profile';

import AsyncStorage from '@react-native-community/async-storage';

const Drawer = createDrawerNavigator();
class ChitsScreen extends React.Component {
    
    constructor(props) {
        super(props);
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

    _removeToken = async () => {
    try {
        await AsyncStorage.removeItem("token");
    } catch (error) {
        //Alert.alert("Something went wrong");
    }
    };

    state = {
      token: "",
      isLoading: true,
      chits: [],
      menuOpen: false,
    };
  
    componentDidMount() {
      this._retrieveToken();
      this.getChits();
    }

    componentDidUpdate() {
        this.getChits();
        console.log("updated");
    }

    getChits() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("http://192.168.100.43:3333/api/v0.0.5/chits", requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    isLoading: false,
                    chits: result
                });
                //console.log(this.state.chits);

                var requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                  };
                  
                  fetch("http://192.168.100.43:3333/api/v0.0.5/chits/3/photo", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));

            })
            .catch(error => {
                //Alert.alert("Something went wrong")
                console.log('error', error)
            });
    }

    _renderItem = ({item}) => (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <Text style={styles.head}>{item.chit_content}</Text>
                <Text style={styles.item}>posted by: {item.user.given_name}</Text>
                <Text style={styles.item}>Family Name: {item.user.family_name}</Text>
                <Text style={styles.item}>Email Address: {item.user.email}</Text>
            </View>
        </View>
    );

    toggleMenu = () => {
        console.log("open and close menu icon");
        this.setState({
            menuOpen: !this.state.menuOpen,
        })
    }

    logout = () => { 
        console.log(this.state.token);
        
        var myHeaders = new Headers();
        myHeaders.append("X-Authorization", this.state.token);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        };

        fetch("http://192.168.100.43:3333/api/v0.0.5/logout", requestOptions)
        .then(response => {
            //console.log(response.text());
            this._removeToken();
            this.props.navigation.navigate('Login');
        })
        .then(result => {
            //console.log(result);
            this._removeToken();
            this.props.navigation.navigate('Login');
        })
        .catch(error => {
            console.log('error', error);
            this._removeToken();
            this.props.navigation.navigate('Login');
        });   
    }

    openProfile = () => { 
        this.props.navigation.navigate('Profile');
    }

    openSearch = () => {
        this.props.navigation.navigate('Search');   
    }

    addChits = () => {
        this.props.navigation.navigate('AddChit');
    }
  
    render() {
      console.log('Render lifecycle')
      return (
        <View style={styles.container}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={this.toggleMenu}>
                    <Image source={require('../assets/menuicon.png')} />
                </TouchableOpacity>

                
            </View>
            

          <FlatList
            data={this.state.chits}
            renderItem={this._renderItem}
            keyExtractor={(item,index) => index}
          />

        <TouchableOpacity onPress={this.addChits} style={styles.addIcon} >
                <Image source={require('../assets/plusicon.png')} />
        </TouchableOpacity>

        {this.state.menuOpen ? (
          <View style={styles.menuContainer}>
              <TouchableOpacity onPress={this.openProfile}>
                    <Text style={styles.menuItem}>Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.openSearch}>
                    <Text style={styles.menuItem}>Search User</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.logout}>
                    <Text style={styles.menuItem}>Logout</Text>
              </TouchableOpacity>
          </View>
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
    navBar: {
        backgroundColor: '#fff',
        height: 50,
        top: -20,
    },
    menuContainer: {
        backgroundColor: '#fff',
        width: '70%',
        height: '100%',
        top: -20,
    }, 
    addIcon: {
        right: 30,
        bottom: 30,
        width: 20,
        height: 20,
        position: 'absolute',
    },
    menuItem: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 16,
        fontWeight: 'bold',
        borderBottomWidth:0.5,
        borderBottomColor:'#555',
        marginHorizontal: 20,
    },
    head: {
        padding: 0,
        fontSize: 16,
        height: 40,
        color: "#00BFFF",
        fontWeight: 'bold',
    },
    item: {
      padding: 0,
      fontSize: 12,
      height: 16,
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
    }
  });

export default ChitsScreen;