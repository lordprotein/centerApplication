import { initUser } from './initialState';
import * as types from '../constants/actionTypes';

const user = (state = initUser, action) => {
    switch (action.type) {
        case types.LOGIN: {
            const { data: { name, role, ID } } = action;
            return {
                ...state,
                isLogin: true,
                userInfo: { name, role, ID }
            }
        }

        case types.LOGOUT: {
            return {
                ...state,
                isLogin: false,
                userInfo: { name: '', role: '', ID: '' }
            }
        }

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

        case types.SET_EXIST_EXECUTERS: {
            let { list } = action;
            const { ID } = state.userInfo;

            list = list.filter(item => item.full_name !== 'Пользователь' && item.ID !== ID);

            return {
                ...state,
                existUsers: list
            }
        }

        default: return state;
    }
}

export default user;