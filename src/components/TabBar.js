import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Home from '../views/Home'
import Search from '../views/Search'
import Discover from '../views/Discover'
import Profile from '../views/Profile'

const Tab = createMaterialBottomTabNavigator()

const TabBar = () => {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: '#3A3A3A' }}
      activeColor="#BEBCD2"
      inactiveColor="#727480"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => {
            <MaterialCommunityIcons name="home" color={color} size={26} />
          }
        }}
      />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

export default TabBar
