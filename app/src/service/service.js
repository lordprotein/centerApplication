import uniqid from 'uniqid';
import { menuTitleList } from './menuTitleList';


class BaseFuncService {
    constructor() {
        this.domain = 'http://localhost:3000';
    }

    getResource = async (url = '', objReq = {}) => {
        const response = await fetch(`${this.domain}/${url}`, objReq);

        if (!response.ok) {
            throw response.status;
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
    // constructor(domain) {
    // super(domain);
    // }

    //Get

    getApplItem = async (id) => {
        const res = await this.getResource(`/application/${id}`);
        return normalizeApp(res);
    }

    getApplList = async (status, userID, isAdmin) => {
        const path = isAdmin
            ? `/application/list/${status}`
            : `/executer/application/list/${status}/${userID}`;

        const res = await this.getResource(path);
        return normalizeApp(res);
    }

    getExecuterList = (appID) => {
        return this.getResource(`/application/executers/${appID}`);
    }

    getExistExecuters = () => {
        return this.getResource('/executer');
    }

    getReportAppWithStatus = (status, id = null) => {
        const path = id ? `/report/status/${status}/${id}` : `/report/status/${status}`;

        return this.getResource(path);
    }

    logout = () => {
        return this.getResource(`/logout`);
    }

    //Post

    addApplication = data => {
        const date = new Date();
        const currDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        data = {
            ...data,
            ID: uniqid(),
            date: currDate,
            phone: data.phone.replace(/[- )(]/g, '')
        };

        return this.methodRequset(`/application`, 'POST', data);

    }

    postAcceptApp = (id_executer, id_application) => {
        const data = {
            id: uniqid(),
            id_application,
        }

        return this.methodRequset(`/executer/application/accept/${id_executer}`, 'POST', data);
    }

    login = (login, password) => {
        return this.methodRequset(`/login`, 'POST', { login, password });
    }
    //Update

    toCompleteApp = (appID) => {
        return this.methodRequset(`/application/status/${appID}`, 'PUT', { status: menuTitleList[2].status });
    }

    setPriority = (appID, priority) => {
        return this.methodRequset(`/application/priority/${appID}`, 'PUT', { priority });
    }

    setCountExecuter = (appID, count) => {
        return this.methodRequset(`/application/count/executer/${appID}`, 'PUT', { count });
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
    if (data.session === false) return [];

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