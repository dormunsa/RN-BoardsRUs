import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import RootReducer from "./RootReducer";

const middleware = applyMiddleware(thunk);
const composedEnhancers = compose(middleware);
const initialState = {};
const AppStore = createStore(RootReducer, initialState, composedEnhancers);

export default AppStore;