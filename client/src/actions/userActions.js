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
    CHANGE_PASS_ERROR, CHANGE_EMAIL_ERROR, CHANGE_EMAIL, CHANGE_AVATAR, CHANGE_AVATAR_ERROR
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
        updateToken(dispatch, data);
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
        updateToken(dispatch, data);
        document.dispatchEvent(new CustomEvent('change_email', { detail : {success: true} }));
    }catch(e){
        document.dispatchEvent(new CustomEvent('change_email', { detail : {success: false} }));
        if(!e.response)
            return dispatch({type: CHANGE_EMAIL_ERROR, error: 'Server error'});
        dispatch({type: CHANGE_EMAIL_ERROR, error: e.response.data});

    }
}

export const changeAvatar = (image) => async (dispatch, getState) => {
    try{
        const id = getState().auth.user.id;
        const formData = new FormData();
        formData.append("id", id);
        formData.append("formFile", image);
        const {data} = await server.post(user_route + "/change-avatar", formData);
        updateToken(dispatch, data);
        document.dispatchEvent(new CustomEvent('change_avatar', { detail : {success: true} }));
    }catch(e){
        document.dispatchEvent(new CustomEvent('change_avatar', { detail : {success: false} }));
        if(!e.response)
            return dispatch({type: CHANGE_AVATAR_ERROR, error: 'Server error'});
        dispatch({type: CHANGE_AVATAR_ERROR, error: e.response.data});

    }
}

export const updateToken = (dispatch, data) => {
    localStorage.setItem('jwtToken', data);
    setAuthorizationToken(data);
    dispatch({type: UPDATE_TOKEN, user: jwtDecode(data)});
}


