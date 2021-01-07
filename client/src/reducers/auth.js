import {SIGN_IN, SIGN_IN_ERROR, SIGN_OUT, UPDATE_TOKEN} from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
    logged_in: false,
    sign_in_error:'',
    user: {}
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                logged_in: !isEmpty(action.user),
                user: action.user,
                sign_in_error: ''
            };
        case SIGN_IN_ERROR:
            return {
                ...state,
                sign_in_error: action.error
            };
        case SIGN_OUT:
            return {
                ...state,
                logged_in: false,
                sign_in_error: '',
                user: {}
            }
        case UPDATE_TOKEN:
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}
