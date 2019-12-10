import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";

import Home from "../screens/HomeScreen";
import AddRecipe from "../screens/AddRecipe";


const MainNavigator = createStackNavigator({
  Home: {screen: Home},
  AddRecipe: {screen: AddRecipe}
});

const App = createAppContainer(MainNavigator);
export default App;


