import React, { Component } from 'react';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import MenuListContainer from '../MenuList/MenuListContainer';


class SidebarContainer extends Component {

    render() {
        return (
            <Sidebar>
                <MenuListContainer />
            </Sidebar>
        );
    }
}

export default SidebarContainer;