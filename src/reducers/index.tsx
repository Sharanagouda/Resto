import {combineReducers} from "redux";
import app from "./appReducer";
import { reducer as formReducer } from 'redux-form';
const form = formReducer;
export default combineReducers({
    app:app,
    form
})