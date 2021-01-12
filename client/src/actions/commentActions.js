import server from "../api/server";
import {comments_route} from "../utils/serverRoutes";
import {GET_COMMENTS, GET_COMMENTS_FAIL} from "./types";

export const getComments = (video_id) => async dispatch => {
    try{
        const {data} = await server.get(comments_route + `/${video_id}`);
        dispatch({type: GET_COMMENTS, comments: data});
    }catch(e){
        if(!e.response)
            return dispatch({type: GET_COMMENTS_FAIL, error: 'Server error'});
        dispatch({type: GET_COMMENTS_FAIL, error: e.response.data});
    }
}

export const getAllComments = () => async dispatch => {
    try{
        const {data} = await server.get(comments_route);
        dispatch({type: GET_COMMENTS, comments: data});
    }catch(e){
        if(!e.response)
            return dispatch({type: GET_COMMENTS_FAIL, error: 'Server error'});
        dispatch({type: GET_COMMENTS_FAIL, error: e.response.data});
    }
}
