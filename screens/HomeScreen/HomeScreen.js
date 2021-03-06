import React, { Component } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Slideshow from "react-native-slideshow";
import PropTypes from "prop-types";
import { NavigationEvents } from "react-navigation";
import { Button } from "react-native-elements";

export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.getTopGifs = this.getTopGifs.bind(this);
    this.addGifs = this.addGifs.bind(this);
    this.getUserByMail = this.getUserByMail.bind(this);
    this.state = {
      isFirstLoad: false,
      isLoading: true,
      topPicks: this.props.screenProps.user.topPicks,
      Gifs: []
    };
  }

  static navigationOptions = () => ({
    title: "Home Screen",
    headerTitleStyle: {
      fontSize: 26,
      color: "#fff",
      textAlign: "center",
      flex: 1,
      fontFamily: "Roboto"
    },
    headerStyle: {
      height: 40,
      backgroundColor: "#0f0821",
      fontFamily: "Roboto"
    }
  });

  componentDidMount() {
    this.getTopGifs();
  }
  async getUserByMail() {
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
            topPicks: data[0].topPicks,
            isLoading: false
          });
        }
      });
  }

  async getTopGifs() {
    this.setState({
      isFirstLoad: false
    });
    const url = "https://boards-r-us-rn.herokuapp.com/getTopGIFs";
    await fetch(`${url}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then(data =>
        data.map(item => {
          this.addGifs(data, item.fileSource, item.id, item.userID);
        })
      );
  }
  addGifs(allGifs, source, id, userId) {
    if (this.state.Gifs.length < 4) {
      this.setState(prevSate => ({
        Gifs: [
          ...prevSate.Gifs,
          {
            fileSource: source,
            id: id,
            userId: userId
          }
        ],
        isLoading: false,
        isFirstLoad: false
      }));
    } else {
      this.setState({
        Gifs: allGifs,
        isLoading: false,
        isFirstLoad: false
      });
    }
  }

  render() {
    const { isLoading, topPicks, isFirstLoad } = this.state;
    let topPicksSourceInput = [];
    let GifsSourceInput = [];
    if (this.state.topPicks.length > 0) {
      this.state.topPicks.forEach(item => {
        let node = {
          url: item.imageSource,
          title: item.name,
          caption: item.brand
        };
        topPicksSourceInput.push(node);
      });
    }
    if (this.state.Gifs) {
      this.state.Gifs.forEach(item => {
        let node = {
          url: item.fileSource
        };
        GifsSourceInput.push(node);
      });
    }
    const { navigate } = this.props.navigation;

    return (
      <View style={{ backgroundColor: "#050407", height: "100%" }}>
        {isFirstLoad == false ? (
          <NavigationEvents onDidFocus={this.getUserByMail} />
        ) : (
          <View></View>
        )}
        {isLoading == true ? (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          <ScrollView>
            <View>
              {topPicks.length > 0 ? (
                <View>
                  <Text style={styles.TopPicks}>Top Picks For You</Text>
                  <Slideshow
                    dataSource={topPicksSourceInput}
                    height={400}
                    overlay={true}
                    containerStyle={{ marginTop: 20 }}
                  />
                </View>
              ) : (
                <View>
                  <Text style={styles.noPofile}>
                    We can see that you do not have a profile yet. Please go to
                    profile page for create Profile
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
                        title="Go to Profile"
                        onPress={() => navigate("Profile")}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {topPicks.length > 0 ? (
                <View>
                  <Text style={styles.TopPicks}>Top Gifs</Text>
                  <Slideshow
                    dataSource={GifsSourceInput}
                    height={400}
                    overlay={true}
                    containerStyle={{ marginTop: 20, marginBottom: 10 }}
                  />
                </View>
              ) : (
                <Text>There is no Gifs</Text>
              )}
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}
HomeScreen.propTypes = {
  screenProps: PropTypes.shape({
    user: PropTypes.isRequired
  }).isRequired,
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
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
  noPofile: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
    fontFamily: "Roboto",
    paddingRight: 15,
    paddingLeft: 15
  },
  button: {
    borderRadius: 10,
    height: 40,
    width: 150,
    marginTop: 20,
    justifyContent: "center"
  }
});

export default HomeScreen;
