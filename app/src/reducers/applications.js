import { initApplication } from './initialState';
import * as types from '../constants/actionTypes';

const applications = (state = initApplication, action) => {
    switch (action.type) {
        case types.SET_APP_LIST: {
            const { appList } = action;

            return {
                ...state,
                list: appList,
                count: appList.length
            }
        }

        case types.REMOVE_APPLICATION: {
            const { ID } = action;
            const { list } = state;

            const numItem = list.findIndex(item => item.id === ID);

            const newAppList = [...list.slice(0, numItem), ...list.slice(numItem + 1)];


            return {
                ...state,
                list: newAppList
            }
        }

        case types.UPDATE_TITLE_PAGE: {
            const { title } = action;

            return {
                ...state,
                title
            }
        }
        default: return state;
    }
}

export default applications;