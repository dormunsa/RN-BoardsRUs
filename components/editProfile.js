import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Picker,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import { Button } from "react-native-elements";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      User: props.user,
      hasProfile: props.user.hasProfile,
      name: props.user.name,
      id: props.user.id,
      address: "",
      gender: "Men",
      level: "1",
      ridingStyle: "Freestyle",
      weight: "",
      height: "",
      shoeSize: "",
      dislikeList: props.user.dislikeList
    };
    this.updateUser = this.updateUser.bind(this);
    this.initState = this.initState.bind(this);
  }

  componentDidMount() {
    if (this.props.user.hasProfile) {
      this.initState();
    }
  }
  initState() {
    this.setState({
      address: this.props.user.address,
      gender: this.props.user.gender,
      level: `${this.props.user.level}`,
      ridingStyle: this.props.user.ridingStyle,
      weight: `${this.props.user.bodyMeasures.weight}`,
      height: `${this.props.user.bodyMeasures.height}`,
      shoeSize: `${this.props.user.bodyMeasures.shoeSize}`
    });
  }
  updateUser() {
    var self = this;
    var newUser = {
      name: "",
      id: 0,
      address: "",
      gender: "",
      level: 0,
      ridingStyle: "",
      weight: 0,
      height: 0,
      shoeSize: 0,
      dislikeList: []
    };

    newUser.name = self.state.name;
    newUser.id = self.state.id;
    newUser.address = self.state.address;
    newUser.gender = self.state.gender;
    newUser.level = self.state.level;
    newUser.weight = self.state.weight;
    newUser.height = self.state.height;
    newUser.shoeSize = self.state.shoeSize;
    newUser.dislikeList = self.state.dislikeList;
    newUser.ridingStyle = self.state.ridingStyle;
    newUser = JSON.stringify(newUser);

    const url = "https://boards-r-us-rn.herokuapp.com/updateUserProfile";

    fetch(`${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: newUser
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then(data => {
        if (data.name != undefined) {
          this.setState({
            User: data,
            hasProfile: true
          });
          Alert.alert("Success");
          this.props.toggleEditMode();
        } else {
          Alert.alert("No update was made.");
          this.props.toggleEditMode();
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
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => this.setState({ address: text })}
              value={this.state.address}
              placeholder="Address:"
              placeholderTextColor="#fff"
            />
            <Text style={styles.label}> Shoe Size:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => this.setState({ shoeSize: text })}
              value={this.state.shoeSize}
              placeholder="Shoe Size:"
              placeholderTextColor="#fff"
            />
            <Text style={styles.label}>Height</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => this.setState({ height: text })}
              value={this.state.height}
              placeholder="Height:"
              placeholderTextColor="#fff"
            />
            <Text style={styles.label}>Weight</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => this.setState({ weight: text })}
              value={this.state.Weight}
              placeholder="Weight:"
              placeholderTextColor="#fff"
            />
            <Text style={styles.label}>Riding Style</Text>
            <Picker
              selectedValue={this.state.ridingStyle}
              style={styles.textInput}
              onValueChange={itemValue =>
                this.setState({ ridingStyle: itemValue })
              }
            >
              <Picker.Item label="All-mountain" value="All-mountain" />
              <Picker.Item label="Freestyle" value="Freestyle" />
              <Picker.Item label="Splitboard" value="Splitboard" />
            </Picker>
            <Text style={styles.label}>Gender</Text>
            <Picker
              selectedValue={this.state.gender}
              style={styles.textInput}
              onValueChange={itemValue => this.setState({ gender: itemValue })}
            >
              <Picker.Item label="Women" value="Women" />
              <Picker.Item label="Men" value="Men" />
            </Picker>
            <Text style={styles.label}>Riding Level:</Text>
            <Picker
              selectedValue={this.state.level}
              style={styles.textInput}
              onValueChange={itemValue => this.setState({ level: itemValue })}
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
            </Picker>
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
                onPress={this.updateUser}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

EditProfile.propTypes = {
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
