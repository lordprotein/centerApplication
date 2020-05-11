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


class Service {
    constructor() {
        this._baseFunc = new BaseFuncService();
        this._normalizeApp = new NormalizeApp();
    }

    //Get

    getApplItem = async (id) => {
        const res = await this._baseFunc.getResource(`/application/${id}`);
        return this._normalizeApp.app(res);
    }

    getApplList = async (status, userID = null) => {
        let path;

        if (userID && status !== menuTitleList[0].status) {
            path = `/executer/application/list/${status}/${userID}`
        }
        else {
            path = `/application/list/${status}`;
        }
        console.log(path)
        const res = await this._baseFunc.getResource(path);
        return this._normalizeApp.app(res);
    }

    //Post

    postAcceptApp = (id_executer, id_application) => {
        const data = {
            id: uniqid(),
            id_application
        }

        return this._baseFunc.methodRequset(`/executer/application/accept/${id_executer}`, 'POST', data);
    }

    //Delete

    resetAppOfExecuter = (id_executer, id_application) => {
        return this._baseFunc.methodRequset(`/executer/application/reset/${id_executer}/${id_application}`, 'DELETE');

    }
}



class NormalizeApp {
    app = data => {
        return data.map(item => {
            const { ID, case_num, date, full_name, phone_num, priority, status, task } = item;

            return {
                id: ID,
                caseNum: case_num,
                date,
                name: full_name,
                phone: phone_num,
                priority,
                status,
                task
            };
        })
    }
}


export const service = new Service();