import React, { Component } from 'react';
import { MenuItem } from '../../../components/MenuList/MenuItem/MenuItem';
import { service } from '../../../service/service';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectorApp } from '../../../selectors/applications';
import { updateStatusLoad } from '../../../actions/loadActions';
import { selectorsLoad } from '../../../selectors/load';
import * as applicationActions from '../../../actions/applicationActions';


class MenuItemContainer extends Component {
    handleClick = () => {
        const { status, setAppList, updateTitleOfPage, name } = this.props;


        this.wrapLoading(() => {
            service.getApplList(status)
                .then(list => {
                    updateTitleOfPage(name)
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

    render() {
        const { name } = this.props;

        return (
            <MenuItem
                name={name}
                action={this.handleClick}
            />
        );
    }
}


const mapStateToProps = state => {
    return {
        appList: selectorApp.list(state),
        statusLoad: selectorsLoad.status(state)

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