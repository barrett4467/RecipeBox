import * as WebBrowser from 'expo-web-browser';
import React from 'react';

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  SafeAreaView
} from 'react-native';
import CardFlip from "react-native-card-flip";

import { Stitch, RemoteMongoClient, BSON, AnonymousCredential} from "mongodb-stitch-react-native-sdk";
import { LinearGradient } from 'expo-linear-gradient';
const MongoDb = require("mongodb-stitch-react-native-services-mongodb-remote");

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      count: [],
      value: false,
      recipeName: "",
      ingredients: "",
      directions: ""
    };
  }
  handleSubmit = () => {
    if(this.state.recipeName.length <= 30 && this.state.ingredients != "" && this.state.directions != ""){
      Keyboard.dismiss();
      const newItem = {
        "recipeName": this.state.recipeName,
        "ingredients": this.state.ingredients,
        "directions": this.state.directions
      };
      // console.log(this.state.recipeName);
      // console.log(this.state.ingredients);
      // console.log(this.state.directions);
      
      const stitchAppClient = Stitch.defaultAppClient;
      const mongoClient = stitchAppClient.getServiceClient(
        RemoteMongoClient.factory,
        "mongodb-atlas"
      );
      Stitch.getAppClient("recipebox-ubscl").getServiceClient(
        RemoteMongoClient.factory,
        "mongodb-atlas"
      );
      const recipes = mongoClient.db("box").collection("recipes");
      const addRecipe = async recipe => {
        const rec = { recipe, owner_id: "5df034421327d592e12bec7a"}
        const item = await recipes.insertOne(rec);
        // console.log(item);
      };
      addRecipe(newItem);


      const { navigate } = this.props.navigation;
        this.setState({
          recipeName: "",
          ingredients: "",
          directions: ""
        });
      navigate("Home")
    } else {
      Alert.alert(
        "Incorrect Format!",
        "Your Recipe Name must be below 30 characters. We also require the ingredient and direction section to be filled out!",
        [
          {text: "Try Again", onPress: () => console.log("Try Again Pressed")}
        ]
      )
    }
    
  };
  render(){
    return (
      
      <LinearGradient
        colors={["#ff8981", "#ffb18d"]}
        style={styles.container}
      >
          <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            enabled
          >
              <ScrollView >
                <View style={styles.inner}>
                  <View style={styles.content}>
                    <Text style={styles.text}>
                      Add a recipe! 
                    </Text>
                    <Text style={styles.bodyText}>Hit enter when done with an ingredient to add the next!</Text>
                      <TextInput 
                        style={styles.inputText} 
                        placeholder="Enter Recipe Name"
                        onChangeText={recipeName => this.setState({ recipeName })}
                        value={this.state.recipeName}
                        onSubmitEditing={() => this.handleSubmit()}
                        />
                        <TextInput 
                        style={styles.inputText} 
                        placeholder="Enter Ingredients"
                        onChangeText={ingredients => this.setState({ ingredients: ingredients })}
                        value={this.state.ingredients}
                        multiline={true}
                        onSubmitEditing={() => this.handleSubmit()}
                        /> 
                        <TextInput 
                        style={styles.inputText} 
                        placeholder="Directions"
                        onChangeText={directions => this.setState({ directions })}
                        value={this.state.directions}
                        onSubmitEditing={() => this.handleSubmit()}
                        />
                        <View style={{flexDirection: "row"}}>
                          <LinearGradient
                            colors={["#ff8981", "#ffb18d"]}
                            style={styles.button}
                          >
                            <TouchableOpacity 
                              onPress={() => this.handleSubmit()}
                              >
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>

                          </LinearGradient>

                        </View>
                  </View>

                </View>
              </ScrollView>
          </KeyboardAvoidingView>

          </LinearGradient>
      
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    justifyContent: "flex-end"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    marginTop: "15%",
    backgroundColor: "#fff",
    borderRadius: 14,
    marginRight: "2%",
    marginLeft: "2%",
    marginTop: "30%"
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
  inputText: {
    padding: "4%",
    fontSize: 30
  },
  button: {
    borderRadius: 14,
    left: 210,
    bottom: 10,
    backgroundColor: "#fff",
    height: 45,
    width: 175
  },
  buttonText: {
    padding: "4%",
    color: "#fff",
    fontSize: 24
  }

});