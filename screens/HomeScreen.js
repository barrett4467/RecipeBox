import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Stitch, RemoteMongoClient, BSON} from "mongodb-stitch-react-native-sdk";
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';


export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: false,
      recipes: [],
      recipeName: "",
      ingredients: [],
      directions: ""
    };
  }
  
  getRecipes = () => {
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
    const loadRecipes = async () => {
      const item = await recipes.find({}, { limit: 1000 }).asArray();
      // console.log("Recipe Collection: ");
      this.setState({ recipes: item });
      // console.log(this.state.recipes);
    }
    loadRecipes();
  }
  componentDidMount() {
    this.getRecipes();
  }
  handleAdd = () => {
    const { navigate } = this.props.navigation;
    navigate("AddRecipe");
  }
  handlePress = (prop) => {
    const { navigate } = this.props.navigation;
    const recipe = prop.recipe;
    this.setState({
      recipeName: recipe.recipeName,
      ingredients: recipe.ingredients,
      directions: recipe.directions
    })
    navigate("ViewRecipe", {
      id: prop._id,
      recipeName: recipe.recipeName,
      ingredients: recipe.ingredients,
      directions: recipe.directions
    })
  }
  render(){
    if (this.state.recipes.length){
      return (
        <>
          <ScrollView style={styles.container}>
          <View>
              {this.state.recipes.map(recipe => {
                console.log(recipe.recipe.recipeName)
                return(
                  <LinearGradient
                    colors={["#ff8981", "#ffb18d"]}
                    style={styles.card}
                  >
                    <TouchableOpacity
                      onPress={() => this.handlePress(recipe)}
                      key={recipe._id}
                    >
                      <Text 
                        key={recipe._id}
                        style={styles.cardText}
                      >{recipe.recipe.recipeName}</Text>
                    </TouchableOpacity>

                  </LinearGradient>
                )
              })}
          </View>
          </ScrollView>
          </>
      );
    } else {
      return(
        <ScrollView style={styles.container}>
          <View style={styles.noRecipeCard}>
            <LinearGradient
              colors={["#ff8981", "#ffb18d"]}
            >
              <View style={styles.noRecipe}>
                <Text style={styles.cardText}>There doesn't appear to be any recipes</Text>
                <TouchableOpacity 
                  onPress={() => this.handleAdd()}
                  style={styles.add}>
                  <Text style={styles.cardText}>Add Recipe</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </ScrollView>
      )
    }
  }
    
}
HomeScreen.navigationOptions = {
  header: null,
  cardStyle: { backgroundColor: "grey"}
};
const styles = StyleSheet.create({
  noRecipe: {
    marginTop: "10%"
  },
  noRecipeCard: {
    marginTop: "75%",
    marginRight: "2%",
    marginLeft: "2%",
    borderRadius: 14,
    padding: "2%"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  add: {
    fontSize: 25,
    borderRadius: 6,
    backgroundColor: "#fff",
    width: 200
  },
  card: {
    marginTop: "15%",
    marginRight: "2%",
    marginLeft: "2%",
    borderRadius: 14,
    padding: "2%"
  },
  cardText: {
    fontSize: 30,
    color: "#fff"
  },
});