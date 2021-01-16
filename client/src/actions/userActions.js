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
    CHANGE_PASS_ERROR
} from './types';
import {change_pass_route, login_route, new_token_route} from "../utils/serverRoutes";
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
        const {data} = await server.post(login_route, {email: formValues.email, password : formValues.password});
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
        const {data} = await server.post(change_pass_route, {id: id, old:formValues.old_password, password : formValues.new_password});
        dispatch({type: CHANGE_PASS, message: "trueee"});
    }catch(e){
        console.log(e.response)
        if(!e.response)
            return dispatch({type: CHANGE_PASS_ERROR, error: 'Server error'});
        dispatch({type: CHANGE_PASS_ERROR, error: e.response.data});
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


