import server from "../api/server";
import {appointments_route} from "../utils/serverRoutes";
import {GET_APPOINTMENTS, GET_APPOINTMENTS_FAIL} from "./types";
import axios from "axios";

export const getAppointments = () => async dispatch => {
    try{
        const {data} = await server.get(appointments_route, {
            headers: {
                'Authorization': axios.defaults.headers.common['Authorization']
            }
        });
        dispatch({type: GET_APPOINTMENTS, appointments: data});
    }catch(e){
        dispatch({type: GET_APPOINTMENTS_FAIL, error: e.response.data});
    }
}
