import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationNativeContainer } from '@react-navigation/native' 
import React, { useState, Component } from 'react'
import { Text, StyleSheet, View, Button, Dimensions } from 'react-native'
import TabBar from './src/index'
import Login from './src/login'
import Register from './src/register'
// import LoginScreen from './src/views/My/HomeScreen'
// const Stack = createNativeStackNavigator();

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName= "登录" headerShown={false}>
    //   <Stack.Screen name="登录" component={Login} />
    //   <Stack.Screen name="注册" component={Register} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  return (
    <View style={styles.container}>
      <NavigationContainer><TabBar></TabBar></NavigationContainer>
      {showLogin ? <Login style={styles.login} /> : <Login style={styles.loginNoShow}/>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  login: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  
  }, 
  loginNoShow: {
    position: 'absolute',
    top: Dimensions.get('window').height,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  
  }
})

export default App