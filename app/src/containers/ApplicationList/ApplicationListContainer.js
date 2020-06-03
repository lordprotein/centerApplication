import React, { Component } from 'react';
import { ApplicationList } from '../../components/ApplicationList/ApplicationList';
import { connect } from 'react-redux';
import { service } from '../../service/service';
import { bindActionCreators } from 'redux';
import { selectorApp } from '../../selectors/applications';
import * as applicationActions from '../../actions/applicationActions';
import { withLoader } from '../../hoc/withLoader';
import { updateStatusLoad } from '../../actions/loadActions';
import { selectorsLoad } from '../../selectors/load';
import uniqid from 'uniqid';
import ApplicationItemContainer from './ApplicationItem/ApplicationItemContainer';
import { selectorsUser } from '../../selectors/user';


class ApplicationListContainer extends Component {

    componentDidMount = () => {
        const {
            setAppList,
            updateStatusLoad,
            updateTitleOfPage,
            userID,
            statusPage,
            titlePage,
            isAdmin
        } = this.props;

        service.getApplList(statusPage, userID, isAdmin).then(res => {
            setAppList(res);
            updateTitleOfPage(titlePage)
            updateStatusLoad(false);
        });
    }


    _generateAppList = () => {
        const { appList } = this.props;

        if (!appList.length) return <h2>Нет записей</h2>

        return appList.length && appList.map(item => {
            return (
                <ApplicationItemContainer
                    data={item}
                    key={uniqid()}
                />
            );
        })
    }


    render() {
        const { statusLoad } = this.props;

        const ApplicationListWithLoader = withLoader(ApplicationList, statusLoad);

        return (
            <ApplicationListWithLoader>
                {this._generateAppList()}
            </ApplicationListWithLoader>
        );
    }
}


const mapStateToProps = state => {
    return {
        appList: selectorApp.list(state),
        statusLoad: selectorsLoad.status(state),
        userID: selectorsUser.id(state),
        isAdmin: selectorsUser.role(state) !== 'Administrator' ? false : true,
    };
}

const mapDispatchToProps = dispatch => {
    const {
        setAppList,
        updateTitleOfPage
    } = bindActionCreators(applicationActions, dispatch)

    return {
        setAppList,
        updateTitleOfPage,
        updateStatusLoad: bindActionCreators(updateStatusLoad, dispatch),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ApplicationListContainer);