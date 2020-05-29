import React, { Component } from 'react';
import { BtnExit } from '../../components/BtnExit/BtnExit';
import { service } from '../../service/service';
import { myCookieUser, myCookieIsLogin } from '../../service/myCookie';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import { connect } from 'react-redux';

class BtnExitContainer extends Component {
    handleExit = (history) => {
        const { logout } = this.props;

        service.logout().then(res => {
            
            myCookieUser.remove();
            myCookieIsLogin.remove();
            logout();

            history.push('/login');
        });
    }

    render() {
        return (
            <BtnExit handleExit={this.handleExit} />
        );
    }
}


const mapDispatchToProps = dispatch => {
    const { logout } = bindActionCreators(userActions, dispatch);

    return { logout };
}


export default connect(null, mapDispatchToProps)(BtnExitContainer);