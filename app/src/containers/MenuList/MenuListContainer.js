import React, { Component } from 'react';
import { MenuList } from '../../components/MenuList/MenuList';
import MenuItemContainer from './MenuItem/MenuItemContainer';
import uniqid from 'uniqid';


class MenuListContainer extends Component {
    constructor(props) {
        super(props);
        this.appList = [
            {
                name: 'Свободные',
                status: 'free'
            },
            {
                name: 'В процессе',
                status: 'process'
            },
            {
                name: 'Выполненные',
                status: 'complited'
            },
        ];
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