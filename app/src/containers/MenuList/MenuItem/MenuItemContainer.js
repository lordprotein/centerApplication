import React, { Component } from 'react';
import { MenuItem } from '../../../components/MenuList/MenuItem/MenuItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectorApp } from '../../../selectors/applications';
import { selectorsLoad } from '../../../selectors/load';
import * as applicationActions from '../../../actions/applicationActions';
import { selectorsUser } from '../../../selectors/user';


class MenuItemContainer extends Component {

    isActiveMenu = () => {
        const { titleMenu, titlePage } = this.props;

        return titleMenu === titlePage ? true : false;
    }


    render() {
        const { titleMenu } = this.props;

        return (
            <MenuItem
                titleMenu={titleMenu}
                activeMenu={this.isActiveMenu()}
            />
        );
    }
}


const mapStateToProps = state => {
    return {
        appList: selectorApp.list(state),
        statusLoad: selectorsLoad.status(state),
        userID: selectorsUser.id(state),
        titlePage: selectorApp.title(state)
    }
}

const mapDispatchToProps = dispatch => {
    const {
        setAppList,
        updateTitleOfPage
    } = bindActionCreators(applicationActions, dispatch);

    return {
        setAppList,
        updateTitleOfPage,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MenuItemContainer);