import React, { Component } from 'react';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import MenuListContainer from '../MenuList/MenuListContainer';
import UserInfoContainer from './UserInfo/UserInfoContainer';
import { connect } from 'react-redux';
import { selectorsUser } from '../../selectors/user';


class SidebarContainer extends Component {

    render() {
        const { isLogin, userRole } = this.props;

        return (
            <Sidebar>
                {isLogin
                    ? (
                        <>
                            <UserInfoContainer />
                            {userRole !== 'User' ? <MenuListContainer /> : false}
                        </>
                    )
                    :
                    false}

            </Sidebar>
        );
    }
}


const mapStateToProps = state => {
    return {
        isLogin: selectorsUser.status(state),
        userRole: selectorsUser.role(state)
    }
}


export default connect(mapStateToProps, null)(SidebarContainer);