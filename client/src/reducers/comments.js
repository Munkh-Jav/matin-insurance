import {GET_COMMENTS, GET_COMMENTS_FAIL} from '../actions/types';

const initialState = {
    comments: [],
    comments_error:''
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_COMMENTS:
            return {
                ...state,
                comments: action.comments,
                comments_error: ''
            };
        case GET_COMMENTS_FAIL:
            return {
                ...state,
                comments_error: action.error
            };

        default:
            return state;
    }
}
