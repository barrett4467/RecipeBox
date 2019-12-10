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
import FlipCard from "react-native-flip-card";

import { MonoText } from '../components/StyledText';

import { Stitch, RemoteMongoClient, BSON} from "mongodb-stitch-react-native-sdk";
const MongoDb = require("mongodb-stitch-react-native-services-mongodb-remote");

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: false,
      recipeName: "",
      ingredients: ""
    };
  }
  handleSubmit = () => {
    Keyboard.dismiss();
    const stitchAppClient = Stitch.defaultAppClient;
    const mongoClient = stitchAppClient.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    console.log(RemoteMongoClient.factory)
  
    const recipeCollection = mongoClient.db("recipeBox").collection("recipes");
    
    const newItem = {
      "name": "Plastic Bricks",
      "quantity": 10,
      "category": "toys",
      "reviews": [{ "username": "legolover", "comment": "These are awesome!" }]
    };
    
    recipeCollection.insertOne(newItem)
      .then(result => console.log(`Successfully inserted item with _id: ${result.insertedId}`))
      .catch(err => console.error(`Failed to insert item: ${err}`))
    // const db = mongoClient.db("recipeBox");
    // const recipes = db.collection("recipes");

    // console.log(db);

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
      <FlipCard style={styles.contentContainer}>
        <View style={styles.face}>
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
              <TouchableOpacity onPress={() => this.handleSubmit()}>
                  <Text>Submit</Text>
              </TouchableOpacity>
        </View>
        <View style={styles.back}>
          <Text style={{fontSize: 24}}>Directions: </Text>
        </View>
      </FlipCard>
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
