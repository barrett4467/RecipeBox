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
          <View style={styles.content}>
            <Text style={styles.text}>Welcome to Recipe Box!</Text>
            <Text style={styles.bodyText}>Choose an option to get started</Text>
            <TouchableOpacity 
              onPress={() => navigate("Home")}
              style={styles.button}
              >
                <Text style={styles.text}>View recipes</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => navigate("AddRecipe")}
              style={styles.button}
              >
                <Text style={styles.text}>New recipe</Text>
            </TouchableOpacity>
          </View>
            
        </View>
    );
  }
    
}
const styles = StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor: "#91a8a4"
    },
    content: {
      marginTop: "15%",
      backgroundColor: "#fff",
      marginRight: "2%",
      marginLeft: "2%",
      marginTop: "30%"
    },  
    text: {
        fontSize: 30
    },
    bodyText: {
      fontSize: 20
    },
    button: {
      backgroundColor: "#fff",
      height: 45,
      borderWidth: 2,
      width: 200,
      borderColor: "black"
    }
})
WelcomeScreen.navigationOptions = {
  header: null,
};

