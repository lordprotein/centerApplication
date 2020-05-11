import React, { Component } from 'react';
import { MenuItem } from '../../../components/MenuList/MenuItem/MenuItem';
import { service } from '../../../service/service';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectorApp } from '../../../selectors/applications';
import { updateStatusLoad } from '../../../actions/loadActions';
import { selectorsLoad } from '../../../selectors/load';
import * as applicationActions from '../../../actions/applicationActions';
import { selectorsUser } from '../../../selectors/user';


class MenuItemContainer extends Component {
    handleClick = () => {
        const { status, setAppList, updateTitleOfPage, titleMenu } = this.props;
        let { userID } = this.props;

        this.wrapLoading(() => {
            service.getApplList(status, userID)
                .then(list => {
                    updateTitleOfPage(titleMenu)
                    return setAppList(list);
                });
        })
    }

    wrapLoading = async action => {
        const { updateStatusLoad } = this.props;

        updateStatusLoad(true);
        await action();
        updateStatusLoad(false);
    }


    isActiveMenu = () => {
        const { titleMenu, titlePage } = this.props;

        return titleMenu === titlePage ? true : false;
    }

    
    render() {
        const { titleMenu } = this.props;

        return (
            <MenuItem
                titleMenu={titleMenu}
                action={this.handleClick}
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
        updateStatusLoad: bindActionCreators(updateStatusLoad, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MenuItemContainer);