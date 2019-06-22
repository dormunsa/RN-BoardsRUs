import React, { Component } from "react";
import { Text, View, ActivityIndicator , StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as HomeScreenActions from "./HomeScreenActions";
import Slideshow from 'react-native-slideshow';


export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.getTopPicks = this.getTopPicks.bind(this);
    this.getTopGifs = this.getTopGifs.bind(this);
    this.addGifs = this.addGifs.bind(this);
    this.state = {
      isLoading: true,
      topPicks: [],
      Gifs: []
    };
  }

  static navigationOptions = () => ({
    title: "Home Screen",
    headerTitleStyle: {
      fontSize: 28,
      color: "#fff",
      textAlign: "center",
      flex: 1
    },
    headerTintColor: "#210144",
    headerStyle: {
      height: 40,
      backgroundColor: "#0f0821"
    }
  });

  componentDidMount() {
    this.getTopPicks("dmun1009@gmail.com");
    this.getTopGifs();
  }

  async getTopPicks(userMail) {
    const url = "https://boards-r-us-mm.herokuapp.com/getUserByEmail/";
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
            topPicks: data[0].topPicks,
            isLoading: false
          });
        }
      });
  }
  async getTopGifs() {
    const url = "https://boards-r-us-mm.herokuapp.com/getTopGIFs";
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
        ]
      }));
    } else {
      this.setState({
        Gifs: allGifs
      });
    }
  }
  
  render() {
    console.log(this.state);
    let dataSourceInput = []
    if(this.state.topPicks){
      this.state.topPicks.forEach((item) => {
        let node  = {
          url : item.imageSource,
          title: item.name,
          caption :item.brand
        };
        dataSourceInput.push(node)
    })
    }
    const { isLoading, topPicks } = this.state;
   
    return (
      <View style = {{backgroundColor : "#050407" , height : "100%"}}>
        {isLoading == true ? (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
          
        ) : (
         
          <View>
            {topPicks ? (
              <View >
              <Text style = {styles.TopPicks}>Top Picks For You</Text>
              <Slideshow 
              dataSource={dataSourceInput}
                height= {400}
                overlay = {true}
                containerStyle = {
                  { marginTop:20}
                }      
                />
              </View>
            ) : (
              <Text>There is Top Picks Boards</Text>
            )}
          </View>
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
    marginTop:10
  }
})


const mapStateToProps = ({ HomeScreen }) => {
  console.log("map state");

  return {
    isLoading: HomeScreen.isLoading
  };
};

function mapDispatchToProps(dispatch) {
  console.log("map dispatch");
  return {
    HomeScreenActions: bindActionCreators(
      {
        HomeScreenActions
      },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
