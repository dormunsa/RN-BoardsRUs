import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  
} from "react-native";
import SearchInput from "../../components/SearchInput";
import BoardsList from "../../components/BoardsList";
import PropTypes from 'prop-types';
import {NavigationEvents} from 'react-navigation';



export  class Boards extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      isLoading: true,
      user: this.props.screenProps.user,
      boardsList: []
    }
  }
  componentDidMount() {
    this.handleSearch("");
  }
  static navigationOptions = () => ({
    title: "Search Board",
    headerTitleStyle: {
      fontSize: 26,
      color: "#fff",
      textAlign: "center",
      flex: 1,
      fontFamily: 'Roboto'
    },
    headerTintColor: "#fff",
    headerStyle: {
      height: 40,
      backgroundColor: "#0f0821"
    }
  });

  handleSearch(query) {
    if(query == ""){
      this.getAllBoards()
    } else {
      this.getSnowByName(query)
    }
  }

   
 async getAllBoards(){
    const url = "https://boards-r-us-rn.herokuapp.com/getAllSnowboards";
    await fetch(`${url}`)
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
            boardsList: data,
            isLoading: false
          });
        }
      });
  }

  async getSnowByName(query){
    const url = "https://boards-r-us-rn.herokuapp.com/getSnowboardByName/";
    await fetch(`${url}${query}`)
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
            boardsList: data,
            isLoading: false
          });
        } else {
          this.setState({
            boardsList: [],
            isLoading: false
          });
        }
      });
  }


  render() {
    const {  isLoading, boardsList } = this.state;
    <NavigationEvents onDidFocus={this.componentDidMount} />
    return (
      <View style = {{backgroundColor : "#050407" , height : "100%"}}>
        <SearchInput handleSearch={this.handleSearch} />
        {isLoading == true ? (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          <View>
            {boardsList.length == 0 ? (
              <Text style={styles.notFound}>There is no results</Text>
            ) : (
             
              <BoardsList
                boardsList = {this.state.boardsList}
                navigation = {this.props.navigation}
                isFromFavorites = {false}
              />
            
            )}
          </View>
        )}
      </View>
    );
  }
}
Boards.propTypes = {
  screenProps: PropTypes.shape({
    user: PropTypes.isRequired,
  }).isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  notFound: {
    marginTop: 300,
    fontSize: 25,
    textAlign: "center",
    color: "#fff",
    
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
});

 
export default Boards;
