import React, { Component } from "react";
import { Text, View, ActivityIndicator , StyleSheet , ScrollView} from "react-native";
import Slideshow from 'react-native-slideshow';
import PropTypes from 'prop-types';


export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.screenProps.user);
    this.getTopGifs = this.getTopGifs.bind(this);
    this.addGifs = this.addGifs.bind(this);
    this.state = {
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
      fontFamily: 'Roboto'
    },
    headerStyle: {
      height: 40,
      backgroundColor: "#0f0821"
    }
  });

  componentDidMount() {
    this.getTopGifs();
  }
 
  async getTopGifs() {
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
        isLoading: false
      }));
    } else {
      this.setState({
        Gifs: allGifs,
        isLoading: false
      });
    }
  }
  
  render() {
    const { isLoading, topPicks, Gifs } = this.state;
    let topPicksSourceInput = []
    let GifsSourceInput = []
    if(this.state.topPicks.length > 0){
      this.state.topPicks.forEach((item) => {
        let node  = {
          url : item.imageSource,
          title: item.name,
          caption :item.brand
        };
        topPicksSourceInput.push(node)
    })
    }
    if(this.state.Gifs){
      this.state.Gifs.forEach((item) => {
        let node  = {
          url : item.fileSource,
        };
        GifsSourceInput.push(node)
    })
    }
  
   
    return (
      <View style = {{backgroundColor : "#050407" , height : "100%"}}>
        {isLoading == true ? (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
          
        ) : (
         <ScrollView>
          <View>
            {topPicks ? (
              <View >
              <Text style = {styles.TopPicks}>Top Picks For You</Text>
              <Slideshow 
              dataSource={topPicksSourceInput}
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
            {Gifs ? (
              <View >
              <Text style = {styles.TopPicks}>Top Gifs</Text>
              <Slideshow 
              dataSource={GifsSourceInput}
                height= {400}
                overlay = {true}
                containerStyle = {
                  { marginTop:20 , marginBottom : 10}
                }      
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
    user: PropTypes.isRequired,
  }).isRequired,
};

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




export default HomeScreen