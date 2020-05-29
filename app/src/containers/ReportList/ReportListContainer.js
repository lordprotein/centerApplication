import React, { Component } from 'react';
import { ReportList } from '../../components/ReportList/ReportList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as applicationActions from '../../actions/applicationActions';
import { ReportItemWithStatus } from './ReportItem/ReportItemContainer';

class ReportListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reportList: [
                {
                    title: 'Выполненные заявки',
                    handle: () => this.getReportListWithStatus('completed', 'Выполненные заявки')
                },
                {
                    title: 'Заявки в работе',
                    handle: () => this.getReportListWithStatus('process', 'Заявки в работе')
                },
            ],
            titleReport: 'asd',
            currentReport: null
        }
    }

    componentDidMount = () => {
        const { updateTitleOfPage } = this.props;

        updateTitleOfPage('Отчёты');
    }

    getReportListWithStatus = (status, titleReport) => {
        this.setState({
            titleReport,
            currentReport: () => <ReportItemWithStatus status={status} title={titleReport} />,
        })
    }



    render() {
        const { reportList } = this.state;
        const G = this.state.currentReport;

        return (
            <>
                <ReportList>
                    {reportList}
                </ReportList>
                {G && <G />}
            </>
        );
    }
}


const mapDispatchToProps = dispatch => {
    const { updateTitleOfPage } = bindActionCreators(applicationActions, dispatch)

    return { updateTitleOfPage };
}


export default connect(null, mapDispatchToProps)(ReportListContainer);