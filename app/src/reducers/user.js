import { initUser } from './initialState';
import * as types from '../constants/actionTypes';

const user = (state = initUser, action) => {
    switch (action.type) {
        case types.SET_USER_INFO: {
            const { data: { name, role, ID } } = action;

            return {
                ...state,
                userInfo: {
                    name,
                    role,
                    ID
                }
            }
        }

        case types.UPDATE_STATUS_LOGIN: {
            const { isStatus } = action;

            return {
                ...state,
                isLogin: isStatus
            }
        }

        default: return state;
    }
}

export default user;