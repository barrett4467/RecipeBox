import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset } from "expo";
import AppNavigator from "./navigation/AppNavigator";
import { Stitch, AnonymousCredential, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: undefined,
      client: undefined,
      isLoadingComplete: false,
      userId: undefined
    };
    this._loadClient = this._loadClient.bind(this);
  }

  componentDidMount() {
    this._loadClient();
  }

  render() {
      return (
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
  }

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  _loadClient() {
    Stitch.initializeDefaultAppClient("recipebox-ubscl")
      .then(client => {
        this.setState({ client })
        const email = "barrett4467@gmail.com";
        const password = "password"
        const credential = new AnonymousCredential();

        console.log(this.state.client.auth.user.id);
        this.state.client.auth
          .loginWithCredential(credential)
          .then(user => {
            console.log(`Successfully logged in as user ${user.id}`);
            this.setState({ currentUserId: user.id });
            this.setState({ currentUserId: client.auth.user.id });
          })
          .then(() => this._handleMongo())
          .catch(err => {
            console.log(`Failed to log in anonymously: ${err}`);
            this.setState({ currentUserId: undefined });
          });
      });
    };
  _handleMongo(){
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
      // console.log(item);
    }
    const addRecipe = async recipe => {
      const rec = { recipe, owner_id: "5df034421327d592e12bec7a"}
      const item = await recipes.insertOne(rec);
      console.log(item);
    }
    const removeRecipe = async recipeId => {
      await recipes.findOneAndDelete({ _id: recipeId });
      console.log(`Recipe with id ${recipeId} has been deleted!`);
    }
    loadRecipes();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});