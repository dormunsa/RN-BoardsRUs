import React, { Component } from "react";
import {
  Text,
  View,
} from "react-native";


export  class Favorites extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = () => ({
    title: "Favorites",
    headerTitleStyle: {
      fontSize: 28,
      color: "#fff",
      textAlign: "center",
      flex: 1
    },
    headerTintColor: "#fff",
    headerStyle: {
      height: 40,
      backgroundColor: "#262626"
    }
  });


  render() {
    return (
    <View >
        <Text > Favorites</Text>
    </View>)
  }
}
export default Favorites;
