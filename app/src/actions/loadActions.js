import * as actionTypes from '../constants/actionTypes';


export function updateStatusLoad(status) {
    return {
        type: actionTypes.UPDATE_STATUS_LOAD,
        status
    }
}