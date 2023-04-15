import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState,Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'

import Login from './src/login'
import Register from './src/register'
import LoginScreen from './src/views/My/HomeScreen'
const Stack = createNativeStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName= "登录" headerShown={false}>
        <Stack.Screen name="登录" component={Login} />
        <Stack.Screen name="注册" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({})
