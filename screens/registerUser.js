
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

  class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            givenName: "",
            familyName: "",
            email: "",
            password: "",
        };    
    }

    registerUser = () => {
        console.log("Register User");

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "given_name": this.state.givenName,
          "family_name": this.state.familyName,
          "email": this.state.email,
          "password": this.state.password
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("http://192.168.100.43:3333/api/v0.0.5/user", requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log(result)
            Alert.alert("user created Successfully");
            this.props.navigation.navigate('Login');
          })
          .catch(error => console.log('error', error));
    }

    componentDidMount() {
      console.log('componentDidMount() lifecycle')
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
                        placeholder="Enter name of user"
                        placeholderTextColor="#003f5c"
                        onChangeText={(givenName) => this.setState({givenName})}
                    />
                    </View>
            
                    <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Enter Family Name"
                        placeholderTextColor="#003f5c"
                        onChangeText={(familyName) => this.setState({familyName})}
                    />
                    </View>

                    <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Enter email"
                        placeholderTextColor="#003f5c"
                        onChangeText={(email) => this.setState({email})}
                    />
                    </View>

                    <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Enter password"
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({password})}
                    />
                    </View>
            
                    <TouchableOpacity style={styles.loginBtn} onPress={this.registerUser}>
                    <Text style={styles.loginText}>REGISTER</Text>
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

export default RegisterScreen;