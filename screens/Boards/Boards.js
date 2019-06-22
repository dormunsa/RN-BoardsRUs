import React, { Component } from "react";
import {
  Text,
  View,
} from "react-native";


export  class Boards extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = () => ({
    title: "Search Board",
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
        <Text > Boards</Text>
    </View>)
  }
}
export default Boards;
