import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Card } from "react-native-elements";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Dimensions
} from 'react-native';

import CardFlip from "react-native-card-flip";
import { Stitch, RemoteMongoClient, BSON} from "mongodb-stitch-react-native-sdk";
import { ScrollView } from 'react-native-gesture-handler';
const MongoDb = require("mongodb-stitch-react-native-services-mongodb-remote");
const height = Dimensions.get("window").height;
console.log(height);
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
      console.log("Recipe Collection: ");
      this.setState({ recipes: item });
      console.log(this.state.recipes);
    }
    loadRecipes();
  }
  componentDidMount() {
    this.getRecipes();
  }
  render(){
    const { navigate } = this.props.navigation;
    const ingredients = [1, 2, 3]
    return (
        <ScrollView style={styles.container}>
        <View>
          <Card style={styles.card}>
            {this.state.recipes.map(recipe => {
              console.log(recipe.recipe.recipeName)
            return <Text key={recipe._id}>{recipe.recipe.recipeName}</Text>
            })}
          </Card>
        </View>
            {/* <CardFlip style={styles.container} ref={(card) => this.card = card}>
                <TouchableOpacity style={styles.card} onPress={() => this.card.flip()}>
                    <View>
                        <Text style={styles.titleText}>{this.state.recipeName}</Text>
                    </View>
                    <View style={styles.blueLines}>
                        {ingredients.map(ingredient => (
                            <Text 
                                style={styles.bodyText}
                                key={ingredient}
                            >
                                {ingredient}
                            </Text>
                        ))}
                    </View>
                    <View style={styles.blueLines}>
                    </View>
                    <View style={styles.blueLines}>
                    </View>
                    <View style={styles.blueLines}>
                    </View>
                    <View style={styles.blueLines}>
                    </View>
                    <View style={styles.blueLines}>
                    </View>
                    <View style={styles.blueLines}>
                    </View>
                    <View style={styles.blueLines}>
                    </View>
                    <View style={styles.blueLines}>
                    </View>
                    <View style={styles.blueLines}>
                    </View>
                  <Button
                    title="Add Recipe"
                    onPress={() => navigate("AddRecipe")}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => this.card.flip()}>
                    <Text style={styles.directionText}>
                    Mix milk, vegetable oil, and 1/2 cup sugar in pan. Scald mixture (heat until just before boiling). Remove from heat and let cool 45 min to hour. When mixture is lukewarm, sprinkle yeast. Let this sit for a minute and then add 4 cups flour. Stir mixture then cover and let rise for an hour. Next, add 1/2 cup flour, baking powder, baking soda and salt. Stir mixture. From here you can either cover and let rise in the fridge overnight or go ahead and make the rolls. Sprinkle surface generously with flour and roll dough into rectangular shape about 1/4" thick. Brush melted butter on top and sprinkle with cinnamon and sugar. Starting with wide-end, roll dough towards you. Cut into 1" pieces and let rest for 20-30 min. Bake at 375 degrees for 13-17 minutes.
                    </Text>
                </TouchableOpacity>
            </CardFlip> */}
        </ScrollView>
    );
  }
    
}

HomeScreen.navigationOptions = {
  header: null,
  cardStyle: { backgroundColor: "grey"}
};


const styles = StyleSheet.create({
  background: {
    backgroundColor: "red"
  },
  container: {
    flex: 1,
    backgroundColor: "#91a8a4"
  },
  card: {
    marginTop: "25%",
    marginRight: "2%",
    marginLeft: "2%",
    height: "75%",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 14,
    backgroundColor: "#fff"
  },
  titleText: {
    marginLeft: "1%",
    marginRight: "1%",
    fontSize: 50,
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
  },
  directionText:{
    marginLeft: "1%",
    marginRight: "1%",
    fontSize: 20
  },
  blueLines: {
    height: 45,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomColor: "#9dc5e4",
    borderWidth: 1.5
  }

});