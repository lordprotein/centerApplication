import React, { Component } from 'react';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import MenuListContainer from '../MenuList/MenuListContainer';
import UserInfoContainer from './UserInfo/UserInfoContainer';


class SidebarContainer extends Component {

    render() {
        return (
            <Sidebar>
                <UserInfoContainer />
                <MenuListContainer />
            </Sidebar>
        );
    }
}

export default SidebarContainer;