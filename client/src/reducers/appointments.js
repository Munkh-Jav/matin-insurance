import {GET_APPOINTMENTS, GET_APPOINTMENTS_FAIL} from '../actions/types';

const initialState = {
    appointments: [],
    appointments_error:''
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_APPOINTMENTS:
            return {
                ...state,
                appointments: action.appointments,
                appointments_error: ''
            };
        case GET_APPOINTMENTS_FAIL:
            return {
                ...state,
                appointments_error: action.error
            };

        default:
            return state;
    }
}
