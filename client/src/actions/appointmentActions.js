import server from "../api/server";
import {appointments_route} from "../utils/serverRoutes";
import {UPDATE_APPOINTMENT, UPDATE_APPOINTMENT_FAIL, GET_APPOINTMENTS, GET_APPOINTMENTS_FAIL} from "./types";
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
        if(!e.response)
            return dispatch({type: GET_APPOINTMENTS_FAIL, error: 'Server error'});

        dispatch({type: GET_APPOINTMENTS_FAIL, error: e.response.data});
    }
}

export const updateAppointment = (appointment) => async dispatch => {
    try{
        const {data} = await server.put(appointments_route, appointment,{
            headers: {
                'Authorization': axios.defaults.headers.common['Authorization']
            }
        });
        dispatch({type: UPDATE_APPOINTMENT, appointment: data});
    }catch(e){
        if(!e.response)
            return dispatch({type: UPDATE_APPOINTMENT_FAIL, error: 'Server error'});

        dispatch({type: UPDATE_APPOINTMENT_FAIL, error: e.response.data});
    }
}

