import React, { Component } from "react";
import {
  Text,
  View,
  AsyncStorage,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import PropTypes from "prop-types";
import BoardsList from "../../components/BoardsList";
import { NavigationEvents } from "react-navigation";

export class Favorites extends Component {
  constructor(props) {
    super(props);
    this.loadFavorites = this.loadFavorites.bind(this);
    this.deleteFavorites = this.deleteFavorites.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      isLoading: true,
      favorites: [],
      isFirstLoad: true
    };
  }

  static navigationOptions = () => ({
    title: "Favorites",
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
    this.loadFavorites();
  }

  loadFavorites() {
    this.setState({
      favorites: [],
      isFirstLoad: false,
      isLoading: true
    });
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        if (stores.length > 0) {
          stores.map((result, i, store) => {
            let item = JSON.parse(store[i][1]);
            this.addItemToFavorites(item);
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      });
    });
  }
  deleteFavorites() {}

  addItemToFavorites(item) {
    this.setState(prevSate => ({
      favorites: [...prevSate.favorites, item],
      isLoading: false
    }));
  }

  render() {
    const { isLoading, favorites, isFirstLoad } = this.state;

    return (
      <View style={{ backgroundColor: "#050407", height: "100%" }}>
        {isFirstLoad == false ? (
          <NavigationEvents onDidFocus={this.loadFavorites} />
        ) : (
          <View></View>
        )}
        {isLoading == true ? (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          <View>
            {favorites.length == 0 ? (
              <Text style={styles.notFound}>You have no favorites boards</Text>
            ) : (
              <BoardsList
                boardsList={this.state.favorites}
                navigation={this.props.navigation}
                isFromFavorites={true}
              />
            )}
          </View>
        )}
      </View>
    );
  }
}
Favorites.propTypes = {
  screenProps: PropTypes.shape({
    user: PropTypes.isRequired
  }).isRequired,
  navigation: PropTypes.object.isRequired
};
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
  }
});

export default Favorites;
