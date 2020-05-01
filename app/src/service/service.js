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

    methodRequset = async (url, method, data) => {
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
        this.baseFunc = new BaseFuncService();
    }
    
    //Get
    
    getApplicationItem = (id) => {
        return this.baseFunc.getResource(`/application/${id}`);
    }

    getApplicationList = (status) => {
        return this.baseFunc.getResource(`/application/list/${status}`);
    }

    //Post
}

export const service = new Service();
export const newService = Service;