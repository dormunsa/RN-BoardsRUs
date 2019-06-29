import React from 'react';
import { AppRegistry} from 'react-native';
import MainNavigation from './components/Navigator'
import { View, ActivityIndicator , StyleSheet } from "react-native";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.getUserByMail = this.getUserByMail.bind(this);
    this.state = {
      isLoading: true,
      user : {}
    };
  }
  componentDidMount() {
    this.getUserByMail("dmun1009@gmail.com");
  }
  async getUserByMail(userMail) {
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
        if (data.length > 0) {
          this.setState({
            user: data[0],
            isLoading: false
          });
        }
      });
  }
  render() {
    const { isLoading, user } = this.state;
    return (
      <View style = {{backgroundColor : "#050407" , height : "100%"}}>
      {isLoading == true ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
        
      ) : (
        <MainNavigation screenProps={{ user: user}} />
      )}
    </View>
     
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  TopPicks : {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    marginTop:10,
    fontFamily: 'Roboto'
  }
})
AppRegistry.registerComponent("BoardsRUs", () => App);
