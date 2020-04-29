import * as actionTypes from '../constants/actionTypes';


export function createApplication(data) {
    return {
        type: actionTypes.CREATE_APPLICATION,
        data
    }
}

export function removeApplication(ID) {
    return {
        type: actionTypes.REMOVE_APPLICATION,
        ID
    }
}
