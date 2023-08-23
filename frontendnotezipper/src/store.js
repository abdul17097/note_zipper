import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userUpdateReducer } from './reducer/userLoginReducer';
import thunk from 'redux-thunk';
import { noteCreateReducer, noteDeleteReducer, noteReducer, noteUpdateReducer } from './reducer/noteReducer';

const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    noteReducer : noteReducer,
    noteCreateReducer: noteCreateReducer,
    noteUpdateNote: noteUpdateReducer,
    noteDeleteReducer: noteDeleteReducer,
    userUpdateReducer: userUpdateReducer
});
const useInfoFromStorage = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')) : null;

const initialState = {
    userLogin: {userInfo: useInfoFromStorage}
}
const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
