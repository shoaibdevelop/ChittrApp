
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


//import AsyncStorage from '@react-native-community/async-storage';

  class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            token: "",
            userId: 0,
        };    
    }

    _storeToken = async () => {
        try {
            await AsyncStorage.setItem("token",this.state.token.toString());
        } catch (error) {
            console.log(error);
            Alert.alert("Something went wrong");
        }
    };
    

    _storeId = async () => {
        try {
            await AsyncStorage.setItem("userId",this.state.id.toString());
        } catch (error) {
            console.log(error);
            Alert.alert("Something went wrong");
        }
    };

    _retrieveToken = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('token')
          jsonValue != null ? JSON.stringify(jsonValue) : null

          this.setState({
              token: jsonValue
          });
          if (jsonValue != null) {
            this.props.navigation.navigate('Chits');
          }
          
        } catch(e) {
          // read error
          console.log(e)
        }
      
        console.log('Done.')
      }

    getLogin = () => {
        var headerConfig = new Headers();
        headerConfig.append("Content-Type", "application/json");
    
        //var creds = JSON.stringify({"email":"emma.smith@example.com","password":"user1"});
        var creds = JSON.stringify({"email":this.state.email,"password": this.state.password});
    
        var requestOptions = {
          method: 'POST',
          headers: headerConfig,
          body: creds,
          redirect: 'follow'
        };
    
        fetch("http://192.168.100.43:3333/api/v0.0.5/login", requestOptions)
          .then(response => {
            response.json()
            .then((data) => {
                //global.token = data.token;
                this.state.token = data.token;
                this.state.id = data.id;
                this._storeToken();
                this._storeId();
                this.props.navigation.navigate('Chits');
            })
            .catch((error) => {
                Alert.alert("Invalid email/password supplied");
            });
          })
          .catch(error => console.log('error', error));
    }

    openSignUp = () => {
        this.props.navigation.navigate('Register');
    }
  
    componentDidMount() {
      console.log('componentDidMount() lifecycle')
      this._retrieveToken();
    }
  
    render() {
      return (
        <SafeAreaView>
            <StatusBar />
            <ScrollView>

            <View style={styles.container}>
            
                    <StatusBar style="auto" />
                    <View style={styles.inputView1}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Email."
                        placeholderTextColor="#003f5c"
                        onChangeText={(email) => this.setState({email})}
                    />
                    </View>
            
                    <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Password."
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({password})}
                    />
                    </View>
            
                    <TouchableOpacity onPress={this.openSignUp}>
                        <Text style={styles.forgot_button}>Register User</Text>
                    </TouchableOpacity>
            
                    <TouchableOpacity style={styles.loginBtn} onPress={this.getLogin}>
                    <Text style={styles.loginText}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
      )
    }
  }
  
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  inputView1: {
    backgroundColor: "#00BFFF",
    borderRadius: 10,
    width: "90%",
    height: 45,
    marginBottom: 20,
    marginTop: 100,
 
    alignItems: "center",
  },
 
  inputView: {
    backgroundColor: "#00BFFF",
    borderRadius: 10,
    width: "90%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#00BFFF",
  },
  rsectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default LoginScreen;