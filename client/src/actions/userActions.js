import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import {
    SIGN_IN,
    SIGN_IN_ERROR,
    SIGN_UP,
    SIGN_UP_ERROR,
    SIGN_OUT,
    UPDATE_TOKEN,
    CHANGE_PASS,
    CHANGE_PASS_ERROR, CHANGE_EMAIL_ERROR, CHANGE_EMAIL
} from './types';
import {user_route} from "../utils/serverRoutes";
import history from "../history";
import server from "../api/server";

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch({type: SIGN_OUT});
    history.push('/auth/login');
}

export const login = (formValues) => async dispatch => {
    try{
        const {data} = await server.post(user_route, {email: formValues.email, password : formValues.password});
        localStorage.setItem('jwtToken', data.token);
        setAuthorizationToken(data.token);
        dispatch({type: SIGN_IN, user: jwtDecode(data.token)});
        history.push('/admin/index');
    }catch(e){
        dispatch({type: SIGN_IN_ERROR, error: e.response.data});
    }
}
export const changePass = (formValues) => async (dispatch, getState) => {
    try{
        const id = getState().auth.user.id;
        const {data} = await server.post(user_route + "/change-pass", {id: id, old:formValues.old_password, password : formValues.new_password});

        document.dispatchEvent(new CustomEvent('change_pass', { detail : {success: true} }));
        dispatch({type: CHANGE_PASS, message: "true"});
    }catch(e){
        if(!e.response)
            return dispatch({type: CHANGE_PASS_ERROR, error: 'Server error'});
        dispatch({type: CHANGE_PASS_ERROR, error: e.response.data});
    }
}

export const changeEmail = (email) => async (dispatch, getState) => {
    try{
        const id = getState().auth.user.id;
        const {data} = await server.post(user_route + "/change-email", {id: id, email : email});
        dispatch({type: CHANGE_EMAIL, email: email});
        document.dispatchEvent(new CustomEvent('change_email', { detail : {success: true} }));
    }catch(e){
        document.dispatchEvent(new CustomEvent('change_email', { detail : {success: false} }));
        if(!e.response)
            return dispatch({type: CHANGE_EMAIL_ERROR, error: 'Server error'});
        dispatch({type: CHANGE_EMAIL_ERROR, error: e.response.data});

    }
}



export const updateToken = () => async dispatch => {
    try{
        const {data} = await server.post(user_route + "/new-token");
        localStorage.setItem('jwtToken', data);
        setAuthorizationToken(data);
        dispatch({type: UPDATE_TOKEN, user: jwtDecode(data)});
    }catch(e){
        //Token update error
    }
}


