import React, { Component } from "react";
import { Text, View , StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";
import PropTypes from "prop-types";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {   
      isFirstLoad: true,
      isLoading: true,
      topPicks: this.props.screenProps.user.topPicks,
      user: this.props.screenProps.user,
    }
 
  }
  static navigationOptions = () => ({
    title: "Profile",
    headerTitleStyle: {
      fontSize: 26,
      color: "#fff",
      textAlign: "center",
      flex: 1,
      fontFamily: "Roboto"
    },
    headerTintColor: "#fff",
    headerStyle: {
      height: 40,
      backgroundColor: "#0f0821",
      fontFamily: "Roboto"
    }
  });

  render() {
    const { user, isFirstLoad } = this.state;
    return (
      <View style={{ backgroundColor: "#050407", height: "100%" }}>
       {isFirstLoad == false ? (
          <NavigationEvents onDidFocus={this.loadFavorites} />
        ) : (
          <View></View>
        )}
        <Text style= {styles.TopPicks}> Hi {user.name}</Text>
        {user.topPicks.length > 0  ? (
          <Text style= {styles.TopPicks}> Welcome to Profile Portal</Text>
        ) : (
          <View></View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  notFound: {
    marginTop: 300,
    fontSize: 25,
    textAlign: "center",
    color: "#fff"
  },
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  TopPicks: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
    fontFamily: "Roboto"
  }
});
Profile.propTypes = {
  screenProps: PropTypes.shape({
    user: PropTypes.isRequired
  }).isRequired,
  navigation: PropTypes.object.isRequired
};
export default Profile;
