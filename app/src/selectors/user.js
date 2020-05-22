class SelectorsUser {
    constructor() {
        this._libState = 'user'
    }

    status = (state) => {
        return state[this._libState].isLogin;
    }

    name = (state) => {
        return state[this._libState].userInfo.name
    }

    role = (state) => {
        return state[this._libState].userInfo.role
    }

    id = (state) => {
        return state[this._libState].userInfo.ID
    }

    getAllInfo = (state) => {
        return state[this._libState].userInfo
    }

    existExecuters = (state) => {
        return state[this._libState].existUsers;
    }
}

export const selectorsUser = new SelectorsUser();