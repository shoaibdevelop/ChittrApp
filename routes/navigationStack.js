import { createStackNavigator } from 'react-native';
import { createAppContainer } from 'react-navigation';

import Login from  '../screens/login';
import Chits from  '../screens/chits';

const screens = {
    Login: {
        screen: Login
    },
    Chits: {
        screen: Chits
    }
}

const NavigationStack =  createStackNavigator(screens);

export default createAppContainer(NavigationStack);