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
  Alert
} from 'react-native';
import CardFlip from "react-native-card-flip";

import { MonoText } from '../components/StyledText';

import { Stitch, RemoteMongoClient, BSON, AnonymousCredential} from "mongodb-stitch-react-native-sdk";
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
      <>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
            <TextInput 
              style={{fontSize: 30}} 
              placeholder="Enter Recipe Name"
              onChangeText={recipeName => this.setState({ recipeName })}
              value={this.state.recipeName}
              onSubmitEditing={() => this.handleSubmit()}
              />
              <TextInput 
              style={{fontSize: 30}} 
              placeholder="Enter Ingredients"
              onChangeText={ingredients => this.setState({ ingredients: ingredients })}
              value={this.state.ingredients}
              multiline={true}
              underlineColorAndroid="red"
              onSubmitEditing={() => this.handleSubmit()}
              /> 
              <TextInput 
              style={{fontSize: 30}} 
              placeholder="Directions"
              onChangeText={directions => this.setState({ directions })}
              value={this.state.directions}
              onSubmitEditing={() => this.handleSubmit()}
              />
              <TouchableOpacity onPress={() => this.handleSubmit()}>
                  <Text>Submit</Text>
              </TouchableOpacity>
        </View>

      </View>
        </>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#91a8a4',
  },
  contentContainer: {
    marginTop: "25%",
    marginRight: "2%",
    marginLeft: "2%",
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "#fff"
  }

});