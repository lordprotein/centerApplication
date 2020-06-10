import React, { Component } from 'react';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import MenuListContainer from '../MenuList/MenuListContainer';
import UserInfoContainer from './UserInfo/UserInfoContainer';
import { connect } from 'react-redux';
import { selectorsUser } from '../../selectors/user';


class SidebarContainer extends Component {

    render() {
        const { isLogin } = this.props;

        return (
            <Sidebar>
                {isLogin
                    ? (
                        <>
                            <UserInfoContainer />
                            <MenuListContainer />
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
        isLogin: selectorsUser.status(state)
    }
}


export default connect(mapStateToProps, null)(SidebarContainer);