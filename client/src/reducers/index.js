import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import auth from "./auth";
import stats from "./stats";
import tasks from "./tasks";

export default combineReducers({
    auth,
    stats,
    tasks,
    form: formReducer,
})