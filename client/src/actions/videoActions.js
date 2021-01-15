import server from "../api/server";
import {videos_route} from "../utils/serverRoutes";
import {
    GET_VIDEOS,
    GET_VIDEOS_FAIL,
    GET_VIDEO,
    GET_VIDEO_FAIL,
    POST_VIDEO,
    POST_VIDEO_FAIL,
} from "./types";
import axios from "axios";

export const getVideo = (video_id) => async dispatch => {
    try{
        const {data} = await server.get(videos_route + `/${video_id}`, {
            headers: {
                'Authorization': axios.defaults.headers.common['Authorization']
            }
        });
        dispatch({type: GET_VIDEO, video: data});
    }catch(e){
        if(!e.response)
            return dispatch({type: GET_VIDEO_FAIL, error: 'Server error'});
        dispatch({type: GET_VIDEO_FAIL, error: e.response.data});
    }
}

export const getVideos = () => async dispatch => {
    try{
        const {data} = await server.get(videos_route, {
            headers: {
                'Authorization': axios.defaults.headers.common['Authorization']
            }
        });
        dispatch({type: GET_VIDEOS, videos: data});
    }catch(e){
        if(!e.response)
            return dispatch({type: GET_VIDEOS_FAIL, error: 'Server error'});
        dispatch({type: GET_VIDEOS_FAIL, error: e.response.data});
    }
}

export const addVideo = (video) => async dispatch => {
    debugger;
    try{
        const {data} = await server.post(videos_route, {
            video_title: video.video_title,
            video_url:video.video_url
        }, {
            headers: {
                'Authorization': axios.defaults.headers.common['Authorization']
            }
        });
        dispatch({type: POST_VIDEO, video: data});
    }catch(e){
        if(!e.response)
            return dispatch({type: POST_VIDEO_FAIL, error: 'Server error'});
        dispatch({type: POST_VIDEO_FAIL, error: e.response.data});
    }
}


