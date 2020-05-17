import React, { Component } from 'react';
import { ApplicationItem } from '../../../components/ApplicationList/ApplicationItem/ApplicationItem';
import { service } from '../../../service/service';
import * as appActions from '../../../actions/applicationActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectorsUser } from '../../../selectors/user';
import { menuTitleList } from '../../../service/menuTitleList';


class ApplicationItemContainer extends Component {
    state = {
        isOpen: false,
        isFirstOpen: true,
        executerList: []
    }


    handleClick = () => {
        const { isOpen } = this.state;
        this.checkFirstOpen();
        this.getExecutersList();
        this.setState(() => { return { isOpen: !isOpen } })
    }


    checkFirstOpen = () => {
        const { isFirstOpen } = this.state;

        if (isFirstOpen) this.setState({ isFirstOpen: false });
    }


    getExecutersList = () => {
        const { data: { id } } = this.props;
        const { isFirstOpen } = this.state;

        if (!isFirstOpen) return;

        service.getExecuterList(id)
            .then(executerList => this.setState({ executerList }));
    }


    handleAccept = () => {
        const { data, data: { id }, removeApplication, userID } = this.props;

        service.postAcceptApp(userID, data)
            .then(() => removeApplication(id));
    }


    handleReset = () => {
        const { data: { id }, removeApplication, userID } = this.props;

        service.resetAppOfExecuter(userID, id)
            .then(() => removeApplication(id))
    }


    handleRemove = () => {
        const { data: { id }, removeApplication } = this.props;

        service.removeAppItem(id)
            .then(() => removeApplication(id));
    }

    handleComplete = () => {
        const { data: { id }, removeApplication } = this.props;

        service.toCompleteApp(id)
            .then(() => removeApplication(id))
    }

    handlePriority = (value) => {
        const { data: { id }, updatePriority } = this.props;

        service.setPriority(id, value)
            .then(() => updatePriority(id, value))
    }


    filterHandle = () => {
        const { data: { status } } = this.props;
        const accept = this.handleAccept;
        const reset = this.handleReset;
        const remove = this.handleRemove;
        const complete = this.handleComplete;
        const setPriority = this.handlePriority;


        switch (status) {
            case menuTitleList[0].status: { //free
                return { accept, remove, setPriority };
            }
            case menuTitleList[1].status: { //progress
                return { reset, remove, complete };
            }
            case menuTitleList[3].status: { //pending
                return { reset, remove, accept, setPriority };
            }
            default: return;
        }
    }


    render() {
        let { data } = this.props;
        const { isOpen, executerList } = this.state;

        if (executerList.length) data = { ...data, executerList };

        return (
            <ApplicationItem
                data={data}
                handleClick={this.handleClick}
                handleBtns={this.filterHandle()}
                isOpen={isOpen}
            />
        );
    }
}


const mapStateToProps = state => {
    return {
        userID: selectorsUser.id(state)
    }
}


const mapDispatchToProps = dispatch => {
    const { updatePriority, removeApplication, addExecuterForApp } = bindActionCreators(appActions, dispatch)

    return { removeApplication, updatePriority, addExecuterForApp };
}


export default connect(mapStateToProps, mapDispatchToProps)(ApplicationItemContainer);