import React, { Component } from 'react';
import { FormAddApplication } from '../../components/FormAddApplication/FormAddApplication';
import { service } from '../../service/service';


class FormAddApplicationContainer extends Component {
    state = {
        data: {
            fullName: '',
            caseNum: 1,
            phone: '',
            task: ''
        },
        error: false
    }

    handleChangeInput = (type, e) => {
        const { value } = e.target;

        this.setState(({ data }) => {
            return { data: { ...data, [type]: value } }
        });
    }

    handleSubmit = (history) => {
        const data = { ...this.state.data };

        for (const item in data) {
            if (!data[item]) return this.setState({ error: 'Одно из полей не заполнено' });
        }

        const check = window.confirm('Подтвердите отправку');
        if (!check) return;

        service.addApplication(data).then(
            () => {
                alert('Заявка отправлена');
                history.push('/');
            },
            (err) => console.log(err)
        );
    }

    render() {
        const { error } = this.state;
        return (
            <FormAddApplication
                handleChange={this.handleChangeInput}
                handleSubmit={this.handleSubmit}
                error={error}
            />
        );
    }
}

export default FormAddApplicationContainer;