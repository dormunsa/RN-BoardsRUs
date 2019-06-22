import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import {HomeScreen} from '../screens/HomeScreen/HomeScreen'
import {Profile} from '../screens/Profile'
import {Boards} from '../screens/Boards/Boards'
import {Favorites} from '../screens/Favorites/Favorites'
import {BoardDetails} from '../screens/BoardDetails'



const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Home') {
    iconName = `ios-home${focused ? '' : ''}`;
    // We want to add badges to home tab icon

  } else if (routeName === 'Profile') {
    iconName = `ios-person${focused ? '' : ''}`;
  }
  else if (routeName === 'Boards') {
    iconName = `md-search${focused ? '' : ''}`;
  }
  else if (routeName === 'Favorites') {
    iconName = `ios-heart${focused ? '' : ''}`;
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const HomeStack = createStackNavigator({
  HomePage: { screen: HomeScreen },
  BoardDetails: { screen: BoardDetails },
});

const FavoritesStack = createStackNavigator({
  Favorites: { screen: Favorites },
  BoardDetails: { screen: BoardDetails },
});
const BoardsStack = createStackNavigator({
  Boards: { screen: Boards },
  BoardDetails: { screen: BoardDetails },
});
const ProfileStack = createStackNavigator({
  Profile: { screen: Profile },
  BoardDetails: { screen: BoardDetails },
});
export default createAppContainer(
  createBottomTabNavigator(
    {
      Profile: { screen: ProfileStack },
      Home: { screen: HomeStack },
      Boards: { screen: BoardsStack },
      Favorites: { screen: FavoritesStack },
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor),
      }),
      tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: '#0f0821',
        },
      },
      initialRouteName:'Home',
    },
  )
);
