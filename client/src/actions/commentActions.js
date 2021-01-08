import server from "../api/server";
import {comments_route} from "../utils/serverRoutes";
import {GET_COMMENTS, GET_COMMENTS_FAIL} from "./types";
import axios from "axios";

export const getComments = (video_id) => async dispatch => {
    try{
        const {data} = await server.get(comments_route + `/${video_id}`, {
            headers: {
                'Authorization': axios.defaults.headers.common['Authorization']
            }
        });
        dispatch({type: GET_COMMENTS, comments: data});
    }catch(e){
        dispatch({type: GET_COMMENTS_FAIL, error: e.response.data});
    }
}
