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
import PropTypes from 'prop-types';

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
        onPress={() => navigate("BoardDetails", { boardData: item })}
      >
        <Card containerStyle={styles.cardStyle}>
          <View style={styles.listItemContainer}>
            <Image
              source={{ uri: item.imageSource }}
              style={styles.listImageItem}
            />
            <Text style = {styles.nameText}>Name: {item.name}</Text>
            <Text style = {styles.brandText}>Brand: {item.brand}</Text>
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
    boardsList: PropTypes.array
  };

const styles = StyleSheet.create({
  image: {
    justifyContent: "flex-start",
    alignItems: "center",
    height: 150
  },
  listImageItem: {
    height: 150,
    width: 150,
    justifyContent: "flex-start",
  },
  listItemContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  backGround: {
    backgroundColor: "#000"
  },
  cardStyle:{
    borderRadius:20,
    backgroundColor: "rgba(38,38,38,0.7)",
  },
  brandText:{
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontFamily: 'Roboto'
  },
  nameText : {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    fontFamily: 'Roboto'
  }
});
