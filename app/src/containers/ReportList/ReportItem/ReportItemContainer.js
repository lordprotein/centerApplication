import React, { Component } from 'react';
import { ReportForCompletedStatus } from '../../../components/ReportList/ReportItem/ReportItem';
import { service } from '../../../service/service';


export class ReportItemWithStatus extends Component {
    state = {
        data: []
    }

    getList = (id) => {
        const { status } = this.props;

        service.getReportAppWithStatus(status, id).then(data => this.setState({ data }));
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
            >
                {this.state.data}
            </ReportForCompletedStatus>
        );
    }
}
