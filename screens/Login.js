import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { Button, Card } from "react-native-elements";
import * as Expo from "expo";
import propTypes from "prop-types";
import { androidClientId } from "../config";
// export let Gmail = null
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false
    };
    this.signIn = this.signIn.bind(this);
    this.LoginPage = this.LoginPage.bind(this);
  }

  async signIn() {
    const result = await Expo.Google.logInAsync({
      androidClientId,
      scopes: ["profile", "email"]
    });
    if (result.type === "success") {
      this.setState(
        {
          isSignedIn: true
        },
        () => {
          this.props.getUserByMail(result.user.email, result.user.name);
        }
      );
    }
  }

  LoginPage(props) {
    return (
      <View>
        <Card containerStyle={styles.cardStyle}>
          <Text style={styles.header}>Welcome to Boards R Us</Text>
          <TouchableOpacity>
            <Button
              buttonStyle={styles.button}
              title="Sign in with Google"
              onPress={() => props.signIn()}
            />
          </TouchableOpacity>
        </Card>
      </View>
    );
  }

  render() {
    const { isSignedIn } = this.state;
    return (
      <View style={styles.container}>
        {isSignedIn == false ? (
          <this.LoginPage signIn={this.signIn} />
        ) : (
          <View style={[styles.container2, styles.horizontal]}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center"
  },
  container2: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  header: {
    fontSize: 25,
    color: "#fff",
    marginBottom: 25
  },
  cardStyle: {
    borderRadius: 20,
    backgroundColor: "rgba(38,38,38,0.7)"
  },
  button: {
    borderRadius: 10,
    height: 40
  }
});

Login.propTypes = {
  changeGmailMode: propTypes.func,
  changeGmailAccount: propTypes.func,
  getUserByMail: propTypes.func
};
