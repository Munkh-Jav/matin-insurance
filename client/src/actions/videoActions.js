import server from "../api/server";
import {videos_route} from "../utils/serverRoutes";
import {GET_VIDEOS, GET_VIDEOS_FAIL, GET_VIDEO, GET_VIDEO_FAIL} from "./types";
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
        dispatch({type: GET_VIDEOS_FAIL, error: e.response.data});
    }
}


