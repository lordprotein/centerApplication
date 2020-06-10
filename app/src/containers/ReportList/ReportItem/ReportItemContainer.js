import React, { Component } from 'react';
import { ReportForCompletedStatus } from '../../../components/ReportList/ReportItem/ReportItem';
import { service } from '../../../service/service';
import { dateNormalize } from '../../../service/normalizeFunctions';


export class ReportItemWithStatus extends Component {
    state = {
        data: [],
        filteredData: false,
        dateStart: false,
        dateEnd: false
    }

    getStartDate = e => {
        const { value } = e.target;
        const { data } = this.state;

        const selectedDate = new Date(value); //Selected date

        const newData = data.filter(({ date_end }) => {
            const dateEnd = new Date(date_end); //Date of app
            return (selectedDate < dateEnd || date_end > this.state.dateEnd) || dateNormalize(selectedDate) === dateNormalize(date_end);
        })

        this.setState({
            filteredData: newData,
            dateStart: selectedDate
        })
    }

    getEndDate = e => {
        const { value } = e.target;
        const { data, dateStart } = this.state;

        const needDate = new Date(value)
        const newData = data.filter(({ date_end }) => {
            const dateEnd = new Date(date_end);

            return needDate > dateEnd && dateStart < dateEnd;
        })

        this.setState({
            filteredData: newData,
            dateEnd: needDate
        })
    }

    getList = (id) => {
        const { status } = this.props;

        service.getReportAppWithStatus(status, id).then(data => this.setState({ data, filteredData: false }));
    }

    componentDidMount = () => {
        const { status } = this.props;

        service.getReportAppWithStatus(status).then(data => this.setState({ data }))
    }

    render() {
        const { title } = this.props;

        return (
            <ReportForCompletedStatus
                getExecuterReport={this.getList}
                title={title}
                handleDate={{
                    getStartDate: this.getStartDate,
                    getEndDate: this.getEndDate
                }}
            >
                {this.state.filteredData ? this.state.filteredData : this.state.data}
            </ReportForCompletedStatus>
        );
    }
}
