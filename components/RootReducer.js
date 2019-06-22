import { combineReducers } from "redux";
import FavoritesReducer from "../screens/Favorites/FavoritesReducer";
import HomeScreenReducer from "../screens/HomeScreen/HomeScreenReducer";
import BoardsReducer from "../screens/Boards/BoardsReducer";

export default combineReducers({
  HomeScreen: HomeScreenReducer,
  FavoritesScreen: FavoritesReducer,
  BoardsScreen:BoardsReducer
});
