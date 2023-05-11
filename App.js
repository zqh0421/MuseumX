import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { CardStyleInterpolators } from '@react-navigation/stack'
import React from 'react'
import Login from './src/views/Login'
import Register from './src/views/Register'
import TabBar from './src/components/TabBar'
import Heritage_Details from './src/views/Heritage_Details'
import Heritage_Discover from './src/views/Heritage_Discover'
// import LoginScreen from './src/views/My/HomeScreen'
// import { Provider as PaperProvider } from 'react-native-paper'

const Stack = createNativeStackNavigator()

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
        <Stack.Group
          screenOptions={{
            presentation: 'modal',
            animation: 'slide_from_bottom'
          }}
        >
          {/* 向上滑入跳转，登录和注册 */}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Heritage_Details" component={Heritage_Details} />
          <Stack.Screen name="Heritage_Discover" component={Heritage_Discover} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
