import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";

import Home from "../screens/HomeScreen";


const MainNavigator = createStackNavigator({
  Home: {screen: Home}
});

const App = createAppContainer(MainNavigator);
export default App;


