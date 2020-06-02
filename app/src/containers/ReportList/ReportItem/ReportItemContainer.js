import React, { Component } from 'react';
import { ReportForCompletedStatus } from '../../../components/ReportList/ReportItem/ReportItem';
import { service } from '../../../service/service';


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

        const selectedDate = new Date(value);

        const newData = data.filter(({ date_end }) => {
            const dateEnd = new Date(date_end);
            return selectedDate < dateEnd;
        })

        this.setState({
            filteredData: newData,
            dateStart: selectedDate
        })
    }

    getEndDate = e => {
        const { value } = e.target;
        const { filteredData, data, dateStart } = this.state;

        const needDate = new Date(value)
        const arrayData = filteredData && dateStart ? filteredData : data;

        const newData = arrayData.filter(({ date_end }) => {
            const dateEnd = new Date(date_end);

            return needDate > dateEnd;
        })

        console.log(newData)
        this.setState({ filteredData: newData })
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
