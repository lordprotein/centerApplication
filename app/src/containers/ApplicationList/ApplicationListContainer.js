import React, { Component } from 'react';
import { ApplicationList } from '../../components/ApplicationList/ApplicationList';
import { connect } from 'react-redux';
import { service } from '../../service/service';
import { bindActionCreators } from 'redux';
import { selectorApp } from '../../selectors/applications';
import { setAppList } from '../../actions/applicationActions';



class ApplicationListContainer extends Component {
    componentDidMount = () => {
        const {setNewAppList} = this.props;

        service.getAppListFree()
            .then(res => setNewAppList(res));
    }


    render() {
        const { appList } = this.props;
        console.log(appList);

        return (
            <ApplicationList itemList={appList} />
        );
    }
}


const mapStateToProps = state => {
    // console.log(state)
    return {
        appList: selectorApp.list(state)
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setNewAppList: bindActionCreators(setAppList, dispatch),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ApplicationListContainer);