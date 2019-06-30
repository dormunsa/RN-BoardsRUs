import React, { Component } from "react";
import { View, Alert,AsyncStorage,Text,StyleSheet,TouchableOpacity } from "react-native";
import PropTypes from 'prop-types';
import ImageView from 'react-native-image-view';

export  class BoardDetails extends Component {
  constructor(props) {
    super(props);
    this.handleAddItemToFavorites = this.handleAddItemToFavorites.bind(this);
    this.isInFavorites = this.isInFavorites.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderFavoritesFooter = this.renderFavoritesFooter.bind(this);
    this.handleDeleteItemToFavorites = this.handleDeleteItemToFavorites.bind(this);
  }

  static navigationOptions = () => ({
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
  handleAddItemToFavorites = async item  => {
   let isInFavoritesIndicator = await this.isInFavorites(item);
   if (!isInFavoritesIndicator) {
     await AsyncStorage.setItem(`${item.id}`, JSON.stringify(item));
     Alert.alert("Success");
   } else{
    Alert.alert("Failed the Boards is already in favorites");
   }
 };
 handleDeleteItemToFavorites = async item  => {
 let isInFavoritesIndicator = await this.isInFavorites(item);
 if (isInFavoritesIndicator) {
    await AsyncStorage.removeItem(`${item.id}`);
    Alert.alert("Success");
 } else {
  Alert.alert("Failed this board is npt exist in favorites");
 }
};
  isInFavorites = async item => {
   var isInFavoritesIndicator = false;
   await AsyncStorage.getItem(`${item.id}`, (err, result) => {
     if (result != null) {
       isInFavoritesIndicator = true;
      
     } else {
       isInFavoritesIndicator = false;
       
     }
   });
   return isInFavoritesIndicator;
 };

 renderFooter({title}) {
  return (
      <View  style={styles.footer}>
          <TouchableOpacity
              style={styles.footerButton}
              onPress={() => {
            this.handleAddItemToFavorites(
              this.props.navigation.state.params.boardData
            );
          }}
          >
              <Text style={styles.footerText}> ♥ </Text>
              <Text style={styles.footerText}>Add {title} to Favotires</Text>
             
          </TouchableOpacity>
         
      </View>
  );
}

renderFavoritesFooter({title}) {
 return (
     <View  style={styles.footer}>
         <TouchableOpacity
             style={styles.footerButton}
             onPress={() => {
           this.handleDeleteItemToFavorites(
             this.props.navigation.state.params.boardData
           );
         }}
         >
             <Text style={styles.footerText}> ♥ </Text>
             <Text style={styles.footerText}>Delete {title} From Favotires</Text>
            
         </TouchableOpacity>
        
     </View>
 );
}
  render() {
    const images = [
      {
          source: {
              uri: this.props.navigation.state.params.boardData.imageSource,
          },
          title: this.props.navigation.state.params.boardData.name,
          width: 400,
          height: 400,
      },
  ];
  const { navigate } = this.props.navigation;
   
      if(this.props.navigation.state.params.isFromFavorites){
      return(
         <View>
        <ImageView
        images={images}
        imageIndex={0}
        renderFooter={this.renderFavoritesFooter}
        onClose={() => navigate("Favorites", { boardsList: this.props.navigation.state.params.boardsList  })}
        >
        </ImageView>
       
      </View>
      ) } else {
        return(
        <View>
          <ImageView
          images={images}
          imageIndex={0}
          renderFooter={this.renderFooter}
          onClose={() => navigate("Boards", { boardsList: this.props.navigation.state.params.boardsList  })}
          >
          </ImageView>
        
        </View>
       )
        
  }
}
}

const styles = StyleSheet.create({
  footer: {
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      paddingHorizontal: 10,
      paddingVertical: 5,
  },
  footerButton: {
      flexDirection: 'row',
      marginLeft: 15,
      borderStyle:"solid",
      borderWidth:1,
      borderColor:"#fff",
      borderRadius:20,
      paddingLeft:5,
      paddingRight:5,
  },
  footerText: {
      fontSize: 16,
      color: '#FFF',
      textAlign: 'center',
  },
});
BoardDetails.propTypes = {
  screenProps: PropTypes.shape({
    user: PropTypes.isRequired,
  }).isRequired,
  navigation: PropTypes.object.isRequired,
};
export default BoardDetails;
