import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Dimensions,
  Alert
} from 'react-native';
import CardFlip from "react-native-card-flip";
import uuid from "react-native-uuid";
import { Stitch, RemoteMongoClient, BSON} from "mongodb-stitch-react-native-sdk";
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';


export default class ViewRecipeScreen extends React.Component {
    deleteRecipe = () => {
        const { navigation } = this.props;
        const { navigate } = this.props.navigation;
        const recipeID = navigation.getParam("id");
        console.log(recipeID);
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

        const removeRecipe = async recipeId => {
          await recipes.findOneAndDelete({ _id: recipeId });
          console.log(`Recipe with id ${recipeId} has been deleted!`);
        }
        removeRecipe(recipeID);
        const loadRecipes = async () => {
            const item = await recipes.find({}, { limit: 1000 }).asArray();
            // console.log("Recipe Collection: ");
            // console.log(item);
        }
    
        loadRecipes();
        Alert.alert(
            "Your recipe has been deleted!",
            "Thank you"
            [
                {text: "Okay", onPress: () => console.log("Okay pressed")}
            ]
        )
        navigate("Home");
    }
    handleDelete = () => {
        Alert.alert(
            "Are you Sure??",
            "Once you press delete your recipe will be gone forever",
            [
                {text: "Delete", onPress: () => this.deleteRecipe()},
                {text: "No", onPress: () => console.log("No Pressed")}
            ]
        )

    }
    render(){
        const { navigation } = this.props;
        let ingredientsArr = navigation.getParam("ingredients").split("\n");
        console.log(navigation.getParam("ingredients").split("\n"));
        
        
        return (
        <>
        {/* <View>
          <LinearGradient
            colors={["#ff8981", "#ffb18d"]}
          > */}
            <CardFlip 
              style={styles.container}
              ref={(card) => this.card = card}>
            <TouchableOpacity style={styles.recipeCard} onPress={() => this.card.flip()}>
                  <View>
                      <Text style={styles.titleText}>{navigation.getParam("recipeName")}</Text>
                  </View>
                  <View>
                      {ingredientsArr.map(item => <Text key={uuid.v1()}style={styles.bodyText}>{item}</Text>)}
                  </View>

            </TouchableOpacity>
            <TouchableOpacity style={styles.recipeCard} onPress={() => this.card.flip()}>
                <Text style={styles.directionText}>
                {navigation.getParam("directions")}
                </Text>
                {/* <TouchableOpacity onPress={()=> this.handleDelete()}>
                    <Text style={styles.deleteText}>Delete Recipe</Text>
                </TouchableOpacity> */}
            </TouchableOpacity>
        </CardFlip> 

          {/* </LinearGradient>
        </View> */}
        </>
    );
  }
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffb18d"
    },
    recipeCard: {
      margin: "2%",
      height: "90%",
      borderWidth: 2,
      borderColor: "black",
      borderRadius: 14,
      backgroundColor: "#fff"
    },
    titleText: {
      marginLeft: "1%",
      marginRight: "1%",
      fontSize: 40,
      lineHeight: 55,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      borderBottomColor: "#f6a3a7",
      borderWidth: 2
    }, 
    bodyText: {
      marginLeft: "1%",
      marginRight: "1%",
      fontSize: 30,
      lineHeight: 35
    },
    directionText:{
      marginLeft: "1%",
      marginRight: "1%",
      fontSize: 20
    },
    blueLines: {
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      borderBottomColor: "#9dc5e4",
      borderWidth: 1.5
    }
  
  });