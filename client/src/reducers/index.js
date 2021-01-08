import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import auth from "./auth";
import stats from "./stats";
import appointments from "./appointments";
import comments from './comments';
import videos from './videos';

export default combineReducers({
    auth,
    stats,
    appointments,
    comments,
    videos,
    form: formReducer,
})