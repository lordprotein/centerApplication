const initialState = {
    data: {
        isAuthorization: false,
        userInfo: {
            name: '',
            role: '', //admin or executer
            ID: ''
        },
        appPart: {
            name: '',
            list: [],
            count: 0,
        }
    },
    visible: {

    }
}

export default initialState;