import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Login from './src/views/Login'
import Register from './src/views/Register'
import TabBar from './src/components/TabBar'
// import LoginScreen from './src/views/My/HomeScreen'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TabBar"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Group>
          {/* 普通跳转，包括下方导航栏 */}
          <Stack.Screen name="TabBar" component={TabBar} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          {/* 向上滑入跳转，登录和注册 */}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;