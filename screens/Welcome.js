import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';


export default class WelcomeScreen extends React.Component {
  render(){
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to Recipe Box!</Text>
            <TouchableOpacity onPress={() => navigate("Home")}>
                <Text style={styles.text}>View your recipes!</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate("AddRecipe")}>
                <Text style={styles.text}>Add a new recipe!</Text>
            </TouchableOpacity>
            
        </View>
    );
  }
    
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        marginTop: "15%"
    },
    text: {
        fontSize: 30
    }
})
WelcomeScreen.navigationOptions = {
  header: null,
};

