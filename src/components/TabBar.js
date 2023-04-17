import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import Page1 from '../views/Page1'
import Page2 from '../views/Page2'
import Page3 from '../views/Page3'
import Page4 from '../views/Page4'

const Tab = createMaterialBottomTabNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Page1" component={Page1} />
      <Tab.Screen name="Page2" component={Page2} />
      <Tab.Screen name="Page3" component={Page3} />
      <Tab.Screen name="Page4" component={Page4} />
    </Tab.Navigator>
  );
}

export default TabBar