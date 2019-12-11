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
  Dimensions
} from 'react-native';
import CardFlip from "react-native-card-flip";

import { MonoText } from '../components/StyledText';

import { Stitch, RemoteMongoClient, BSON, AnonymousCredential} from "mongodb-stitch-react-native-sdk";
const MongoDb = require("mongodb-stitch-react-native-services-mongodb-remote");

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: false,
      recipeName: "",
      ingredients: [],
      directions: ""
    };
  }
  handleSubmit = () => {
    Keyboard.dismiss();
    const newItem = {
      "recipeName": this.state.recipeName,
      "ingredients": this.state.ingredients,
      "directions": this.state.directions
    };
    console.log(this.state.recipeName);
    console.log(this.state.ingredients);
    console.log(this.state.directions);
    
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
      console.log(item);
    };
    addRecipe(newItem);
    this.setState({
      recipeName: "",
      ingredients: "",
      directions: ""
    });
  };
  render(){
    return (
      <TouchableOpacity style={styles.contentContainer}>
        <View>
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
              onChangeText={ingredients => this.setState({ ingredients: ingredients.split(", ") })}
              value={this.state.ingredients}
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
      </TouchableOpacity>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    marginTop: "15%",
    marginRight: "2%",
    marginLeft: "2%",
    borderWidth: 2,
    borderColor: "black"
  },
  recipe: {
    marginTop: "15%",
    height: "100%",
    backgroundColor: "lightgrey",
    borderWidth: 2,
    borderColor: "#eee"
  }

});