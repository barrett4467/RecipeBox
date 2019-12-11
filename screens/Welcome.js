import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default class WelcomeScreen extends React.Component {
  render(){
    const { navigate } = this.props.navigation;
    return (
      <LinearGradient
        colors={["#ff8981", "#ffb18d"]}
        style={{ height: "100%", flex: 1 }}
      >
        <View style={styles.content}>
          <Text style={styles.text}>Welcome to Recipe Box!</Text>
          <Text style={styles.bodyText}>Recipe Box is designed to be a virtual recipe holder. Go ahead and add your favorite recipes to get started!</Text>
          <View style={{flexDirection: "row", justifyContent: "space-around"}}>
            <TouchableOpacity 
              onPress={() => navigate("Home")}
              style={styles.button}
              >
                <LinearGradient
                  colors={["#ff8981", "#ffb18d"]}
                  style={{ height: "100%", borderRadius: 6 }}
                >
                  <Text style={styles.buttonText}>View recipes</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => navigate("AddRecipe")}
              style={styles.button}
              >
                <LinearGradient
                  colors={["#ff8981", "#ffb18d"]}
                  style={{ height: "100%", borderRadius: 6 }}
                >
                  <Text style={styles.buttonText}>New Recipe</Text>
                </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }
    
}
const styles = StyleSheet.create({
    container: {
      height: "100%"
    },
    content: {
      display: "flex",
      flexDirection: "column",
      marginTop: "15%",
      backgroundColor: "#fff",
      borderRadius: 14,
      marginRight: "2%",
      marginLeft: "2%",
      marginTop: "30%",
      height: 500
    },  
    text: {
      justifyContent: "flex-start",
      padding: "4%",
      fontSize: 45
    },
    bodyText: {
      padding: "4%",
      justifyContent: "flex-start",
      fontSize: 30
    },
    button: {
      borderRadius: 14,
      alignItems: "center",
      top: 50,
      backgroundColor: "#fff",
      height: 45,
      width: 175
    },
    buttonText: {
      padding: "4%",
      color: "#fff",
      fontSize: 24
    }
})
WelcomeScreen.navigationOptions = {
  header: null,
};

