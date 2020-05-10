import React, { Component } from 'react';
import { MenuList } from '../../components/MenuList/MenuList';
import MenuItemContainer from './MenuItem/MenuItemContainer';
import uniqid from 'uniqid';
import { menuTitleList } from '../../service/menuTitleList';


class MenuListContainer extends Component {
    constructor(props) {
        super(props);
        this.appList = menuTitleList;
    }

    getMenuList = () => {
        return this.appList.map(item => {
            return (
                <MenuItemContainer
                    {...item}
                    key={uniqid()}
                />
            );
        })
    }

    render() {
        return (
            <MenuList>
                {this.getMenuList()}
            </MenuList>
        );
    }
}

export default MenuListContainer;