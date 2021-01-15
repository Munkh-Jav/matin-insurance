import server from "../api/server";
import {comments_route} from "../utils/serverRoutes";
import {
    DELETE_COMMENT,
    DELETE_COMMENT_FAIL,
    GET_COMMENTS,
    GET_COMMENTS_FAIL,
    UPDATE_COMMENT,
    UPDATE_COMMENT_FAIL
} from "./types";
import axios from "axios";

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

export const updateComment = (comment) => async dispatch => {
    try{
        const {data} = await server.put(comments_route, comment,{
            headers: {
                'Authorization': axios.defaults.headers.common['Authorization']
            }
        });
        dispatch({type: UPDATE_COMMENT, comment: data});
    }catch(e){
        if(!e.response)
            return dispatch({type: UPDATE_COMMENT_FAIL, error: 'Server error'});

        dispatch({type: UPDATE_COMMENT_FAIL, error: e.response.data});
    }
}

export const deleteComment = (comment) => async dispatch => {
    try{
        await server.delete(comments_route+`/${comment.id}`, {
            headers: {
                'Authorization': axios.defaults.headers.common['Authorization']
            }
        });
        dispatch({type: DELETE_COMMENT, comment: comment});
    }catch(e){
        if(!e.response)
            return dispatch({type: DELETE_COMMENT_FAIL, error: 'Server error'});

        dispatch({type: DELETE_COMMENT_FAIL, error: e.response.data});
    }
}