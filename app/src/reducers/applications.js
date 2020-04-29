import initialState from './initialState';
import * as types from '../constants/actionTypes';

const applications = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_APPLICATION: {
         
        }
        case types.REMOVE_APPLICATION: {
            
        }
        default: return state;
    }
}

export default applications;