import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Card } from "react-native-elements";
import PropTypes from "prop-types";

export default class BoardsList extends Component {
  constructor(props) {
    super(props);
    this._keyExtractor = this._keyExtractor.bind(this);
    this.renderListStyle = this.renderListStyle.bind(this);
    this.renderListStylePic = this.renderListStylePic.bind(this);
  }
  _keyExtractor(item) {
    return item.id.toString();
  }

  renderListStyle() {
    return (
      <FlatList
        style={styles.backGround}
        data={this.props.boardsList}
        renderItem={this.renderListStylePic}
        keyExtractor={this._keyExtractor}
        key={this._keyExtractor}
      />
    );
  }

  renderListStylePic({ item }) {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <TouchableOpacity
          onPress={() =>
            navigate("BoardDetails", {
              boardData: item,
              boardsList: this.props.boardsList,
              isFromFavorites: this.props.isFromFavorites
            })
          }
        >
          <Card containerStyle={styles.cardStyle}>
            <View style={styles.listItemContainer}>
              <Text style={styles.brandText}>
                Brand: {item.brand} {"\n"}
                <Text>Name: {item.name}</Text>
              </Text>
              <Image
                source={{ uri: item.imageSource }}
                style={styles.listImageItem}
              />
            </View>
          </Card>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  render() {
    return this.renderListStyle();
  }
}

BoardsList.propTypes = {
  navigation: PropTypes.object.isRequired,
  boardsList: PropTypes.array,
  handleAddItemToFavorites: PropTypes.array,
  isFromFavorites: PropTypes.bool
};

const styles = StyleSheet.create({
  image: {
    justifyContent: "flex-start",
    height: 150
  },
  listImageItem: {
    height: 150,
    width: 150,
    justifyContent: "flex-start"
  },
  listItemContainer: {
    flexDirection: "row"
  },
  backGround: {
    backgroundColor: "#000"
  },
  cardStyle: {
    borderRadius: 20,
    backgroundColor: "rgba(38,38,38,0.7)"
  },
  brandText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "right",
    fontFamily: "Roboto",
    marginTop: 25,
    position: "absolute",
    right: 1
  },
  nameText: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Roboto"
  }
});
