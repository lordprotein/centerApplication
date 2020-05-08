import {initLoad} from './initialState';
import * as types from '../constants/actionTypes';

const load = (state = initLoad, action) => {
    switch (action.type) {
        case types.UPDATE_STATUS_LOAD: {
            const { status } = action;
            
            return {
                ...state,
                isLoading: status
            }
        }

        default: return state;
    }
}

export default load;