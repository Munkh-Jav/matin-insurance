import server from "../api/server";
import {tasks_route} from "../utils/serverRoutes";
import {GET_TASKS, GET_TASKS_FAIL} from "./types";
import axios from "axios";

export const getTasks = () => async dispatch => {
    try{
        const {data} = await server.get(tasks_route, {
            headers: {
                'x-auth-token': axios.defaults.headers.common['x-auth-token']
            }
        });
        dispatch({type: GET_TASKS, tasks: data});
    }catch(e){
        dispatch({type: GET_TASKS_FAIL, error: e.response.data});
    }
}
