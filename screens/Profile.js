import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView , TouchableOpacity} from "react-native";
import { Button } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import PropTypes from "prop-types";
import EditProfile from "../components/editProfile";
import AddGif from '../components/addGifs'

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstLoad: true,
      profileEditMode: false,
      isLoading: true,
      addGifMode:false,
      topPicks: this.props.screenProps.user.topPicks,
      user: this.props.screenProps.user
    };
    this.getUserByMail = this.getUserByMail.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.toggleEditGifMode= this.toggleEditGifMode.bind(this)
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
      profileEditMode: !this.state.editMode
    });
    this.getUserByMail()
  }
  toggleEditGifMode() {
    console.log("inside toggle gif mode")
    this.setState({
      addGifMode: !this.state.addGifMode
    });
    this.getUserByMail()
  }
  async getUserByMail() {
    this.setState({
      isFirstLoad: false,
      profileEditMode: false,
      addGifMode: false,
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
    const { user, isFirstLoad, profileEditMode , addGifMode } = this.state;
    return (
      <View style={{ backgroundColor: "#050407", height: "100%" }}>
        <ScrollView>
          {isFirstLoad == false ? (
            <NavigationEvents onDidFocus={this.getUserByMail} />
          ) : (
            <View></View>
          )}
          <Text style={styles.TopPicks}> Hi {user.name}</Text>
          {user.topPicks.length > 0 || profileEditMode==true ? (
            <View>
              <Text style={styles.TopPicks}> Welcome to Profile Portal</Text>
              {profileEditMode == false ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 10
                  }}
                >
                <TouchableOpacity>
                  <Button
                    buttonStyle={styles.button}
                    title="Edit Profile"
                    onPress={() => this.setState({ profileEditMode: true })}
                  />
                  </TouchableOpacity>
                </View>
              ) : (
                <EditProfile
                  toggleEditMode={this.toggleEditMode}
                  editMode={profileEditMode}
                  user={user}
                />
              )}
              {addGifMode== false ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 10
                  }}
                >
                 <Text style={styles.TopPicks}> Have an Awesome Gif? {"\n"} Share it with us! </Text>
                <TouchableOpacity>
                  <Button
                    buttonStyle={styles.button}
                    title="Add Gif"
                    onPress={() => this.setState({ addGifMode: true })}
                  />
                  </TouchableOpacity>
                </View>
              ) : (
                <AddGif
                  toggleEditMode={this.toggleEditGifMode}
                  editMode={addGifMode}
                  user={user}
                />
              )}
            </View>
          ) : (
          <View>
            {profileEditMode == false && addGifMode== false ? (
              <View>
            <Text style={styles.noPofile}>
                  We strongly recommend you to create profile so our system 
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
                <TouchableOpacity>
                  <Button
                    buttonStyle={styles.button}
                    title="Create Profile"
                    onPress={() => this.setState({ profileEditMode: true })}
                  />
                  </TouchableOpacity>
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
    marginTop: 20,
    fontFamily: "Roboto",
    paddingRight:15,
    paddingLeft: 15
  }
});
Profile.propTypes = {
  screenProps: PropTypes.shape({
    user: PropTypes.isRequired
  }).isRequired,
  navigation: PropTypes.object.isRequired
};
export default Profile;
