import * as actionTypes from '../constants/actionTypes';


export function setAppList(appList) {
    return {
        type: actionTypes.SET_APP_LIST,
        appList
    }
}

export function removeApplication(ID) {
    return {
        type: actionTypes.REMOVE_APPLICATION,
        ID
    }
}

export function updateTitleOfPage(title) {
    return {
        type: actionTypes.UPDATE_TITLE_PAGE,
        title
    }
}

export function updatePriority(ID, priority) {
    return {
        type: actionTypes.UPDATE_PRIORITY,
        data: { ID, priority }
    }
}