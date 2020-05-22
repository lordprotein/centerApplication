import React, { Component } from 'react';
import { App } from '../../components/App/App';
import PageContainer from '../Page/PageContainer';
import SidebarContainer from '../Sidebar/SidebarContainer';
import { withRoutes } from '../../hoc/withRoutes';
import { service } from '../../service/service';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';


class AppContainer extends Component {
    componentDidMount = () => {
        const { setExistExecuters } = this.props;

        service.getExistExecuters().then(list => {
            setExistExecuters(list);
        });
    }

    render() {
        const PageContainerWithRoutes = withRoutes(PageContainer);

        return (
            <App>
                <SidebarContainer />
                <PageContainerWithRoutes />
            </App>
        );
    }
}


const mapDispatchToProps = dispatch => {
    const { setExistExecuters } = bindActionCreators(userActions, dispatch);

    return { setExistExecuters };
}


export default connect(null, mapDispatchToProps)(AppContainer);
