import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'


import Log  from './src/login'
import Register from './src/register'

function LOG({ navigation: { navigate } }) {
  return (
    <View >
      <Log/>
      <Button title='还没有账号？注册' onPress={() => navigate("注册")} />
    </View>
  );
}

function REGISTER({ navigation: { navigate } }){
  return(
    <View>
      <Register />
      <Button title='已有账号？登录' onPress={() => navigate("登录")} />
    </View>
  )
}

const Stack = createNativeStackNavigator();


export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName= "登录" headerShown={false}>
        <Stack.Screen name="登录" component={LOG} />
        <Stack.Screen name="注册" component={REGISTER} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({})
