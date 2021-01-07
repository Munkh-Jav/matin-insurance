import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import {SIGN_IN, SIGN_IN_ERROR, SIGN_OUT, UPDATE_TOKEN} from './types';
import {login_route, new_token_route} from "../utils/serverRoutes";
import history from "../history";
import server from "../api/server";

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch({type: SIGN_OUT});
    history.push('/auth/login');
}

export const login = (formValues) => async dispatch => {
    const bodyFormData = new FormData();
    bodyFormData.append('email', formValues.email);
    bodyFormData.append('password', formValues.password);
    try{
        const {data} = await server.post(login_route, bodyFormData);
        localStorage.setItem('jwtToken', data);
        setAuthorizationToken(data);
        dispatch({type: SIGN_IN, user: jwtDecode(data)});
        history.push('/admin/index');
    }catch(e){
        dispatch({type: SIGN_IN_ERROR, error: e.response.data});
    }
}


export const updateToken = () => async dispatch => {
    try{
        const {data} = await server.post(new_token_route);
        localStorage.setItem('jwtToken', data);
        setAuthorizationToken(data);
        dispatch({type: UPDATE_TOKEN, user: jwtDecode(data)});
    }catch(e){
        //Token update error
    }
}


