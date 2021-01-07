import server from "../api/server";
import {stats_route} from "../utils/serverRoutes";
import {GET_STATS, GET_STATS_FAIL} from "./types";
import axios from "axios";

export const getStats = () => async dispatch => {
    try{
        const {data} = await server.get(stats_route, {
            headers: {
                'x-auth-token': axios.defaults.headers.common['x-auth-token']
            }
        });
        dispatch({type: GET_STATS, stats: data});
    }catch(e){
        dispatch({type: GET_STATS_FAIL, error: e.response.data});
    }
}