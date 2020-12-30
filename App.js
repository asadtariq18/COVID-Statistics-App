import * as React from 'react';

import WorldScreen from './assets/WorldScreen';
import CountryScreen from './assets/CountryScreen';
import FavoriteScreen from './assets/FavoriteScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="World Statistics">
        <Drawer.Screen name="Favorites" component={FavoriteScreen} />
        <Drawer.Screen name="World Statistics" component={WorldScreen} />
        <Drawer.Screen name="Country Statistics" component={CountryScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
