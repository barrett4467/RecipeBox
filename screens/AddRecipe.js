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
      ingredients: "",
      directions: ""
    };
  }
  handleSubmit = () => {
    Keyboard.dismiss();
    const newItem = {
      "recipeName": "Test",
      "ingredients": ["testing1", "testing2"],
      "directions": "Testing to see if works"
    };
    console.log(this.state.recipeName);
    console.log(this.state.ingredients);
    console.log(this.state.directions);
    
    const stitchAppClient = Stitch.defaultAppClient;
    const mongoClient = stitchAppClient.getServiceClient(
      RemoteMongoClient.factory
    );
    
    // console.log(RemoteMongoClient.factory)
    
    const recipeCollection = mongoClient.db("recipeBox").collection("recipes");
    // recipeCollection.find({})
    //   .then(results => console.log(`results:`, results))
    //   .catch(console.error)
    // console.log(recipeCollection);
    // recipeCollection.insertOne(newItem)
    //   .then(result => console.log(`Successfully inserted item with _id: ${result.insertedId}`))
    //   .catch(err => console.error(`Failed to insert item: ${err}`))
    const db = mongoClient.db("recipeBox");
    // const recipes = db.collection("recipes");
   


    console.log(db.collection("recipes").read);

    // if (this.state.recipeName != "" && this.state.ingredients != ""){
    //   recipes
    //     .insertOne({
    //       status: "new",
    //       recipeName: this.state.recipeName,
    //       ingredients: this.state.ingredients,
    //       date: new Date()
    //     })
    //     .then(() => {
    //       this.setState({ value: !this.state.value })
    //       this.setState({ text: "" });
    //     })
    //     .catch(err => {
    //       console.warn(err);
    //     });
    // }
  };
  render(){
    return (
      <TouchableOpacity style={styles.contentContainer}>
        <View>
            <TextInput 
              style={{fontSize: 30}} 
              placeholder="Enter Recipe Name"
              onChangeText={recipeName => this.setState({ recipeName })}
              value={this.state.text}
              onSubmitEditing={() => this.handleSubmit()}
              />
              <TextInput 
              style={{fontSize: 30}} 
              placeholder="Enter Ingredients"
              onChangeText={ingredients => this.setState({ ingredients })}
              value={this.state.text}
              onSubmitEditing={() => this.handleSubmit()}
              />
              <TextInput 
              style={{fontSize: 30}} 
              placeholder="Directions"
              onChangeText={directions => this.setState({ directions })}
              value={this.state.text}
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
