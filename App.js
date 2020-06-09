import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  TouchableWithoutFeedback,
  AsyncStorage,
  Alert
  
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons  } from 'react-native-vector-icons';

import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/detail.js";

import Login from "./screens/Login";
import Register from "./screens/Register";
import Notification from "./screens/NotificationScreen";
import Post from "./screens/PostScreen";
import MesageScreen from "./screens/MesageScreen";
import Insert from "./screens/Insert";

const Stack = createStackNavigator();
const Tab= createBottomTabNavigator();
function Hometab(){
  return(
    <Tab.Navigator
     screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? require('./images/home_64px.png')
                : require('./images/home_64px.png')
            // } else if (route.name === 'Meseage') {
            //   iconName = focused ?
            //   require('./images/meseage.png')
            //   : require('./images/meseage.png');
            }else if (route.name === 'Post') {
              iconName = focused ?
              require('./images/add_64px.png')
              :  require('./images/add_64px.png');
            }else if (route.name === 'Notification') {
              iconName = focused ?
              require('./images/notifi.png')
              :  require('./images/notifi.png');
            }

            // You can return any component that you like here!
            return <Image source={iconName} style={{width:20, height:20}} 
             resizeMode="contain" 
            
            />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#15D4F6',
          inactiveTintColor: 'gray',
         
        }}
    >

    
    <Tab.Screen name="Home" component={HomeScreen}/>
     {/* <Tab.Screen name="Meseage" component={MesageScreen}/> */}
     <Tab.Screen name="Post" component={Post}/>
     <Tab.Screen name="Notification" component={Notification}/>
     </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode="none" >
      <Stack.Screen name="Login" component={Login}  />
      <Stack.Screen name="Home" component={Hometab} 
       />
        
    
        <Stack.Screen name="Insert" component={Insert}  />
        <Stack.Screen name="Details" component={DetailsScreen} options={{title: 'Welcome'}} />
        <Stack.Screen name="Register" component={Register}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



