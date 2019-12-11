import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";

import Home from "../screens/HomeScreen";
import AddRecipe from "../screens/AddRecipe";
import WelcomeScreen from "../screens/Welcome";
const MainNavigator = createStackNavigator({
  Welcome: {screen: WelcomeScreen},
  Home: {screen: Home},
  AddRecipe: {screen: AddRecipe}
});

const App = createAppContainer(MainNavigator);
export default App;


