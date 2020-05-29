import React, { Component } from 'react';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import MenuListContainer from '../MenuList/MenuListContainer';
import BtnExitContainer from '../BtnExit/BtnExitContainer';


class SidebarContainer extends Component {

    render() {
        return (
            <Sidebar>
                <MenuListContainer />
                <BtnExitContainer />
            </Sidebar>
        );
    }
}

export default SidebarContainer;