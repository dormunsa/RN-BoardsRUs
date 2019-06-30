import React from "react";
import { AppRegistry } from "react-native";
import MainNavigation from "./components/Navigator";
import { View } from "react-native";
import Login from "./screens/Login";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.getUserByMail = this.getUserByMail.bind(this);
    this.state = {
      isLoading: true,
      user: {}
    };
  }

  async getUserByMail(userMail, userName) {

    const url = "https://boards-r-us-rn.herokuapp.com/getUserByEmail/";
    await fetch(`${url}${userMail}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then(async data => {
        if (data.length == 0) {
          this.addUser(userMail, userName);
        } else {
          this.setState({
            user: data[0],
            isLoading: false
          });
        }
      });
  }

  async addUser(name, email) {
    var newUser = {
      name: "",
      email: ""
    };
    newUser.name = name;
    newUser.email = email;
    const url = "https://boards-r-us-rn.herokuapp.com/addNewUser";
    await fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(json => {
        if (json.name != undefined) {
          this.setState({
            user: json,
            isLoading: false
          });
        } else {
          alert(`No update was made.`);
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={{ backgroundColor: "#050407", height: "100%" }}>
        {this.state.isLoading == true ? (
          <Login getUserByMail={this.getUserByMail} />
        ) : (
          <MainNavigation screenProps={{ user: this.state.user }} />
        )}
      </View>
    );
  }
}

AppRegistry.registerComponent("BoardsRUs", () => App);
