import React, { Component } from 'react';
import { ApplicationList } from '../../components/ApplicationList/ApplicationList';
import { connect } from 'react-redux';
import { service } from '../../service/service';
import { bindActionCreators } from 'redux';
import { selectorApp } from '../../selectors/applications';
import { setAppList } from '../../actions/applicationActions';
import { withLoader } from '../../hoc/withLoader';
import { updateStatusLoad } from '../../actions/loadActions';
import { selectorsLoad } from '../../selectors/load';



class ApplicationListContainer extends Component {

    componentDidMount = () => {
        const { setNewAppList, updateStatusLoad } = this.props;

        service.getAppListFree()
            .then(res => {
                setNewAppList(res);
                updateStatusLoad(false);
            });
    }



    render() {
        const { appList, statusLoad } = this.props;

        const ApplicationListWithLoader = withLoader(ApplicationList, statusLoad);

        return <ApplicationListWithLoader itemList={appList} />
    }
}


const mapStateToProps = state => {
    return {
        appList: selectorApp.list(state),
        statusLoad: selectorsLoad.status(state)
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setNewAppList: bindActionCreators(setAppList, dispatch),
        updateStatusLoad: bindActionCreators(updateStatusLoad, dispatch),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ApplicationListContainer);