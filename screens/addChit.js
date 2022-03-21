
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

  class AddChitScreen extends React.Component {
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
      
    }

    constructor(props) {
        super(props);

        this.state = {
            content: "",
            userId: 0,
        };    
        //chit_content,user_id
    }

    addChit = () => {
        console.log("Add Chit");

        var myHeaders = new Headers();
            myHeaders.append("X-Authorization", "de3dfb687fc2e8fef524704e1f5f80a0");
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({"chit_content":this.state.content,"user_id":this.state.userId});

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch("http://192.168.100.43:3333/api/v0.0.5/chits", requestOptions)
            .then(response => response.text())
            .then(result => {
                this.props.navigation.navigate('Chits');
            })
            .catch(error => console.log('error', error));
    }

    componentDidMount() {
      console.log('componentDidMount() lifecycle')
      this._retrieveUserId();
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
                        placeholder="Enter chit content"
                        placeholderTextColor="#003f5c"
                        onChangeText={(content) => this.setState({content})}
                    />
                    </View>
            
                    <TouchableOpacity style={styles.loginBtn} onPress={this.addChit}>
                    <Text style={styles.loginText}>Add</Text>
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
    backgroundColor: "#fff",
    borderRadius: 5,
    width: "90%",
    height: 200,
    marginBottom: 20,
    marginTop: 100,
    borderWidth: 0.5,
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

export default AddChitScreen;