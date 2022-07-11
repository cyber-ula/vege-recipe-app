import { combineReducers } from "redux";
import recipes from "./recipes";
import auth from './auth';


export const reducers = combineReducers({ recipes, auth });