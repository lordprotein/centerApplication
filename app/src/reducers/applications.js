import initialState from './initialState';
import * as types from '../constants/actionTypes';

const applications = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_APP_LIST: {
            const { data, data: { appPart } } = state;
            const { appList } = action;

            return {
                ...state,
                data: {
                    ...data,
                    appPart: {
                        ...appPart,
                        list: appList,
                        count: appList.length
                    }
                }
            }
        }
        
        case types.REMOVE_APPLICATION: {
            const { ID } = action;
            const { data, data: { appPart, appPart: { list } } } = state;


            const numItem = list.findIndex(item => item.ID = ID);

            const newAppList = [...list.slice(0, list[numItem]), ...list.slice(list[numItem + 1])];

            return {
                ...state,
                data: {
                    ...data,
                    appPart: {
                        ...appPart,
                        list: newAppList
                    }
                }
            }
        }
        default: return state;
    }
}

export default applications;