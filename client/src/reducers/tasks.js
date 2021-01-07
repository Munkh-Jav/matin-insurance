import {GET_TASKS, GET_TASKS_FAIL} from '../actions/types';

const initialState = {
    tasks: [],
    task_error:''
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: action.tasks,
                task_error: ''
            };
        case GET_TASKS_FAIL:
            return {
                ...state,
                task_error: action.error
            };

        default:
            return state;
    }
}
