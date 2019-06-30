import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import PropTypes from "prop-types";
import EditProfile from "../components/editProfile";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstLoad: true,
      editMode: false,
      isLoading: true,
      topPicks: this.props.screenProps.user.topPicks,
      user: this.props.screenProps.user
    };
    this.getUserByMail = this.getUserByMail.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
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
  componentDidMount() {
    this.getUserByMail();
  }
  toggleEditMode() {
    this.setState({
      editMode: !this.state.editMode
    });
    this.getUserByMail()
  }
  async getUserByMail() {
    this.setState({
      isFirstLoad: false,
      editMode: false
    });
    const url = "https://boards-r-us-rn.herokuapp.com/getUserByEmail/";
    await fetch(`${url}${this.props.screenProps.user.email}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then(async data => {
        if (data.length > 0) {
          this.setState({
            user: data[0],
          });
        }
      });
  }

  render() {
    const { user, isFirstLoad, editMode } = this.state;
    return (
      <View style={{ backgroundColor: "#050407", height: "100%" }}>
        <ScrollView>
          {isFirstLoad == false ? (
            <NavigationEvents onDidFocus={this.getUserByMail} />
          ) : (
            <View></View>
          )}
          <Text style={styles.TopPicks}> Hi {user.name}</Text>
          {user.topPicks.length > 0 || editMode==true ? (
            <View>
              <Text style={styles.TopPicks}> Welcome to Profile Portal</Text>
              {editMode == false ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 10
                  }}
                >
                  <Button
                    buttonStyle={styles.button}
                    title="Edit Profile"
                    onPress={() => this.setState({ editMode: true })}
                  />
                </View>
              ) : (
                <EditProfile
                  toggleEditMode={this.toggleEditMode}
                  editMode={editMode}
                  user={user}
                />
              )}
            </View>
          ) : (
          <View>
            {editMode == false ? (
              <View>
            <Text style={styles.noPofile}>
                  We can see that you do not have a profile yet. 
                  We strongly recommend you to create one so our system 
                  will find the best boards that match you.
            </Text>
            <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 10
                  }}
                >
                  <Button
                    buttonStyle={styles.button}
                    title="Create Profile"
                    onPress={() => this.setState({ editMode: true })}
                  />
                </View>
            </View>
            ) : (
              <View></View>
            )} 
          </View>
          )}
        </ScrollView>
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
  },
  button: {
    borderRadius: 10,
    height: 40,
    width: 150,
    marginTop: 20,
    justifyContent: "center"
  },
  noPofile: {
    fontSize: 18,
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
