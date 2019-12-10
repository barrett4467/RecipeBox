import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset } from "expo";
import AppNavigator from "./navigation/AppNavigator";
import { Stitch, AnonymousCredential, UserPasswordCredential } from "mongodb-stitch-react-native-sdk";



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: undefined,
      client: undefined,
      isLoadingComplete: false
    };
    this._loadClient = this._loadClient.bind(this);
  }

  componentDidMount() {
    this._loadClient();
  }

  render() {
    // if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
    //   console.log("still Loading")
    //   return (
    //     <AppLoading
    //       // startAsync={this._loadResourcesAsync}
    //       onError={this._handleLoadingError}
    //       onFinish={this._handleFinishLoading}
    //     />
    //   );
    // } else {
      return (
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    // }
  }

  // _loadResourcesAsync = async () => {
  //   await Expo.Font.loadAsync({
  //     Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
  //   })
  // };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  _loadClient() {
    Stitch.initializeDefaultAppClient("recipebox-ooeij")
      .then(client => {
        this.setState({ client })
        const email = "barrett4467@gmail.com";
        const password = "password"
        const credential = new UserPasswordCredential(email, password);
        this.state.client.auth
          .loginWithCredential(credential)
          .then(user => {
            console.log(`Successfully logged in as user ${user.id}`);
            this.setState({ currentUserId: user.id });
            this.setState({ currentUserId: client.auth.user.id });
          })
          .catch(err => {
            console.log(`Failed to log in anonymously: ${err}`);
            this.setState({ currentUserId: undefined });
          });
      });
    };
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});