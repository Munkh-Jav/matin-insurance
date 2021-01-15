import {GET_VIDEO, GET_VIDEOS, GET_VIDEO_FAIL, GET_VIDEOS_FAIL, POST_VIDEO, POST_VIDEO_FAIL} from '../actions/types';

const initialState = {
    videos: [],
    videos_error:'',
    video: {},
    video_error:''
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_VIDEOS:
            return {
                ...state,
                videos: action.videos,
                videos_error: ''
            };
        case GET_VIDEOS_FAIL:
            return {
                ...state,
                videos_error: action.error
            };
        case POST_VIDEO:
            return {
                ...state,
                videos: [...state.videos, action.video],
                videos_error: ''
            };
        case POST_VIDEO_FAIL:
            return {
                ...state,
                videos_error: action.error
            };
        case GET_VIDEO:
            return {
                ...state,
                video: action.video,
                video_error: ''
            };
        case GET_VIDEO_FAIL:
            return {
                ...state,
                video_error: action.error
            };
        default:
            return state;
    }
}
