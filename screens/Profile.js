import React, { Component } from "react";
import {
  Text,
  View,
} from "react-native";
import {NavigationEvents} from 'react-navigation';


export  class Profile extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = () => ({
    title: "Profile",
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
    <NavigationEvents onDidFocus={this.componentDidMount} />
    return (
    <View >
        <Text > Profile</Text>
    </View>)
  }
}
export default Profile;
