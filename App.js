import React, { useState } from 'react';
import type {Node} from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/login';
import ChitsScreen from './screens/chits';

import './globals/GlobalVariables';
import ProfileScreen from './screens/profile';
import UsersSearchScreen from './screens/usersSearch';
import UserProfileScreen from './screens/userProfile';
import FollowersScreen from './screens/followers';
import FollowingScreen from './screens/following';
import RegisterScreen from './screens/registerUser';
import AddChitScreen from './screens/addChit';

const App: () => Node = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="Chits" component={ChitsScreen} options={{headerShown: false}}/>
        <Stack.Screen name="AddChit" component={AddChitScreen} options={{headerShown: true}}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: true}}/>
        <Stack.Screen name="Search" component={UsersSearchScreen} options={{headerShown: true}}/>
        <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{headerShown: true}}/>
        <Stack.Screen name="Followers" component={FollowersScreen} options={{headerShown: true}}/>
        <Stack.Screen name="Following" component={FollowingScreen} options={{headerShown: true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
