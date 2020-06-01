import React, { Component } from 'react';
import { MenuList } from '../../components/MenuList/MenuList';
import MenuItemContainer from './MenuItem/MenuItemContainer';
import uniqid from 'uniqid';
import { menuTitleList } from '../../service/menuTitleList';
import { connect } from 'react-redux';
import { selectorsUser } from '../../selectors/user';


class MenuListContainer extends Component {
    constructor(props) {
        super(props);
        this.appList = menuTitleList;
    }

    getMenuList = () => {
        const { role } = this.props;

        return this.appList.map(item => {
            if (item.forRole !== role && item.forRole) return;

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


const mapStateToProps = state => {
    return {
        role: selectorsUser.role(state)
    }
}


export default connect(mapStateToProps, null)(MenuListContainer);