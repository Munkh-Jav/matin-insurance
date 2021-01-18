import server from "../api/server";
import {admin_info_route} from "../utils/serverRoutes";
import {UPDATE_ADMININFO, UPDATE_ADMININFO_FAIL, GET_ADMININFO, GET_ADMININFO_FAIL} from "./types";
import axios from "axios";

export const getAdminInfo = () => async dispatch => {
    try{
        const {data} = await server.get(admin_info_route, {
            headers: {
                'Authorization': axios.defaults.headers.common['Authorization']
            }
        });
        dispatch({type: GET_ADMININFO, admininfo: data});
    }catch(e){
        if(!e.response)
            return dispatch({type: GET_ADMININFO_FAIL, error: 'Server error'});

        dispatch({type: GET_ADMININFO_FAIL, error: e.response.data});
    }
}

export const updateAdminInfo = (admininfo) => async dispatch => {
    try{
        const {data} = await server.put(admin_info_route, admininfo,{
            headers: {
                'Authorization': axios.defaults.headers.common['Authorization']
            }
        });
        dispatch({type: UPDATE_ADMININFO, admininfo: data});
    }catch(e){
        if(!e.response)
            return dispatch({type: UPDATE_ADMININFO_FAIL, error: 'Server error'});

        dispatch({type: UPDATE_ADMININFO_FAIL, error: e.response.data});
    }
}

