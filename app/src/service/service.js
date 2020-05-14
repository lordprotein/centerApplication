import uniqid from 'uniqid';
import { menuTitleList } from './menuTitleList';


class BaseFuncService {
    constructor() {
        this.domen = 'http://localhost:3000';
    }

    getResource = async (url = '', objReq = {}) => {
        const response = await fetch(`${this.domen}/${url}`, objReq);

        if (!response.ok) {
            throw new Error('Data not received');
        }

        return response.json();
    }

    methodRequset = async (url, method, data = {}) => {
        const req = await this.getResource(url, {
            method,
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });

        return await req;
    }
}


class Service extends BaseFuncService {
    // constructor(domen) {
        // super(domen);
    // }

    //Get

    getApplItem = async (id) => {
        const res = await this.getResource(`/application/${id}`);
        return normalizeApp.app(res);
    }

    getApplList = async (status, userID) => {
        const res = await this.getResource(`/executer/application/list/${status}/${userID}`);
        return normalizeApp.app(res);
    }

    //Post

    postAcceptApp = (id_executer, item) => {
        const { id, countExecuter } = item;

        const data = {
            id: uniqid(),
            id_application: id,
            countExecuter
        }

        return this.methodRequset(`/executer/application/accept/${id_executer}`, 'POST', data);
    }

    //Update

    toCompleteApp = (appID) => {
        return this.methodRequset(`/application/status/${appID}`, 'PUT', { status: menuTitleList[2].status });
    }

    setPriority = (appID, priority) => {
        return this.methodRequset(`/application/priority/${appID}`, 'PUT', { priority });

    }

    //Delete

    resetAppOfExecuter = (userID, appID) => {
        return this.methodRequset(`/executer/application/reset/${userID}/${appID}`, 'DELETE');
    }

    removeAppItem = (userID) => {
        return this.methodRequset(`/application/${userID}`, 'DELETE');
    }
}



function normalizeApp(data) {
    return data.map(item => {
        const { ID, case_num, date, full_name, phone_num, priority, status, task, count_executer, current_count_executers } = item;

        return {
            id: ID,
            caseNum: case_num,
            date,
            name: full_name,
            phone: phone_num,
            priority,
            status,
            task,
            countExecuter: count_executer,
            currCountExecuters: current_count_executers
        };
    })
}


export const service = new Service();