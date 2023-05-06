import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
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
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="museum" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="text-search" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({ color }) => (
            <AntDesign name="find" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#fff',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default TabBar
