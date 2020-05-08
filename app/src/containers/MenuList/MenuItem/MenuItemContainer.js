import React, { Component } from 'react';
import { MenuItem } from '../../../components/MenuList/MenuItem/MenuItem';
import { service } from '../../../service/service';
import { setAppList } from '../../../actions/applicationActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectorApp } from '../../../selectors/applications';
import { updateStatusLoad } from '../../../actions/loadActions';
import { selectorsLoad } from '../../../selectors/load';


class MenuItemContainer extends Component {
    handleClick = () => {
        const { status, setNewAppList } = this.props;


        this.wrapLoading(() => {
            service.getApplList(status)
                .then(list => {
                    return setNewAppList(list);
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
    return {
        setNewAppList: bindActionCreators(setAppList, dispatch),
        updateStatusLoad: bindActionCreators(updateStatusLoad, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MenuItemContainer);