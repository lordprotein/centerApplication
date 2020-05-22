import * as actionTypes from '../constants/actionTypes';


export function setUserInfo(data) {
    return {
        type: actionTypes.SET_USER_INFO,
        data
    }
}

export function updateStatusLogin(isStatus) {
    return {
        type: actionTypes.UPDATE_STATUS_LOGIN,
        isStatus
    }
}

export function setExistExecuters(list) {
    return {
        type: actionTypes.SET_EXIST_EXECUTERS,
        list
    }
}