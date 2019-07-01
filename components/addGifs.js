import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import { Button } from "react-native-elements";

export default class AddGif extends Component {
  constructor(props) {
    super(props);
    this.state = {
      User: props.user,
      date: "",
      fileSource: ""
    };
    this.addGifs = this.addGifs.bind(this);
  }

  async addGifs() {
    var newGif = {
      userID: "",
      date: 0,
      fileSource: ""
    };
    newGif.userID = this.state.User.id;
    newGif.date = this.state.date;
    newGif.fileSource = this.state.fileSource;
    newGif = JSON.stringify(newGif);

    const url = "https://boards-r-us-rn.herokuapp.com/addNewGIF";

    await fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: newGif
    })
      .then(response => {
        if (response.ok) {
          Alert.alert("Success");
          this.props.toggleEditMode();
          return response.json();
        } else {
          Alert.alert("No update was made.");
          this.props.toggleEditMode();
          throw new Error("Something went wrong ...");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <View>
        <ScrollView>
          <View
            stlye={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <Text style={styles.label}>Date:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => this.setState({ date: text })}
              value={this.state.address}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#fff"
            />
            <Text style={styles.label}> File Source:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => this.setState({ fileSource: text })}
              value={this.state.shoeSize}
              placeholder="File Source"
              placeholderTextColor="#fff"
            />
          </View>
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
                title="Submit"
                onPress={this.addGifs}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

AddGif.propTypes = {
  boardsList: PropTypes.array,
  user: PropTypes.object,
  editMode: PropTypes.bool,
  toggleEditMode: PropTypes.func,
  isFromFavorites: PropTypes.bool
};
const styles = StyleSheet.create({
  label: {
    color: "#fff",
    marginTop: 18,
    marginBottom: 5
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 1,
    color: "#fff",
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  button: {
    borderRadius: 10,
    height: 40,
    width: 150,
    marginTop: 20
  }
});
