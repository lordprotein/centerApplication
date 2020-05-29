import React, { Component } from 'react';
import { App } from '../../components/App/App';
import PageContainer from '../Page/PageContainer';
import SidebarContainer from '../Sidebar/SidebarContainer';
import { withRoutes } from '../../hoc/withRoutes';
import { service } from '../../service/service';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import { myCookieUser } from '../../service/myCookie';
import { selectorsUser } from '../../selectors/user';


class AppContainer extends Component {
    componentDidMount = () => {
        const { setExistExecuters, login } = this.props;

        service.getExistExecuters().then(list => {
            setExistExecuters(list);
        });

        const savedUserData = myCookieUser.get();
        savedUserData && login(savedUserData);
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


const mapStateToProps = state => {
    return {
        existExecutersList: selectorsUser.existExecuters(state)
    }
}


const mapDispatchToProps = dispatch => {
    const { setExistExecuters, login } = bindActionCreators(userActions, dispatch);

    return { setExistExecuters, login };
}


export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
