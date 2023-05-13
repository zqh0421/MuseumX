import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Login from './src/views/Login'
import Register from './src/views/Register'
import Publish from './src/views/Publish'
import Person from './src/views/Person'
import EditUsername from './src/views/EditUsername'
import EditDescription from'./src/views/EditDescription'
import TabBar from './src/components/TabBar'
import Heritage_Details from './src/views/Heritage_Details'
import Heritage_Discover from './src/views/Heritage_Discover'

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
          <Stack.Screen name="Person" component={Person} />
          <Stack.Screen name="EditUsername" component={EditUsername} />
          <Stack.Screen name="EditDescription" component={EditDescription} />
          <Stack.Screen name="Publish" component={Publish} />
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
