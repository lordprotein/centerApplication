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
        executerList: [],
        currCountExecuters: null,
        countExecuter: 1
    }

    componentDidMount = () => {
        const { data: { currCountExecuters, countExecuter } } = this.props;

        this.setState({ currCountExecuters, countExecuter });
    }

    firstOpenWrap = (callback) => {
        const { isFirstOpen } = this.state;

        if (isFirstOpen) {
            callback();
            this.setState({ isFirstOpen: false });
        }
    }


    handleClick = () => {
        const { isOpen } = this.state;
        this.firstOpenWrap(() => this.getExecutersList());

        this.setState(() => { return { isOpen: !isOpen } })
    }


    getExecutersList = () => {
        const { data: { id } } = this.props;

        service.getExecuterList(id)
            .then((list) => this.setState({ executerList: list }));
    }


    handleAccept = () => {
        const { data: { id }, removeApplication, userID } = this.props;

        service.postAcceptApp(userID, id)
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
        const { data: { status } } = this.props,
            accept = this.handleAccept,
            reset = this.handleReset,
            remove = this.handleRemove,
            removeExecuter = this.handleRemoveExecuter,
            complete = this.handleComplete,
            setPriority = this.handlePriority,
            setCountExecuter = this.setCountExecuter,
            addOneMoreExecuter = this.addOneMoreExecuter;


        switch (status) {
            case menuTitleList[0].status: { //free
                return { accept, remove, setPriority, setCountExecuter, addOneMoreExecuter };
            }
            case menuTitleList[1].status: { //progress
                return { reset, remove, complete, removeExecuter, setCountExecuter };
            }
            case menuTitleList[3].status: { //pending
                return { reset, remove, accept, setPriority, addOneMoreExecuter, removeExecuter, setCountExecuter };
            }
            default: return;
        }
    }


    setCountExecuter = e => {
        const { data: { id } } = this.props;
        const { countExecuter } = this.state;

        const { value } = e.target;

        if (value < 1) return;

        service.setCountExecuter(id, value).then(res => {
            this.setState({ countExecuter: value })
        })
    }


    handleRemoveExecuter = (userID) => {
        const { data: { id }, removeApplication } = this.props,
            { executerList } = this.state;

        const newExecutersList = executerList.filter(executer => executer.ID != userID);

        service.resetAppOfExecuter(userID, id).then(res => {
            if (!newExecutersList.length) return removeApplication(id);
            this.setState({ executerList: newExecutersList });
        });
    }


    addOneMoreExecuter = (idExecuter) => {
        const { data: { id, countExecuter }, removeApplication } = this.props;

        service.postAcceptApp(idExecuter, id).then(() => {

            const newCount = this.state.currCountExecuters + 1;
            this.setState(({ currCountExecuters }) => { return { currCountExecuters: currCountExecuters + 1 } })

            if (countExecuter === newCount) return removeApplication(id);

            this.getExecutersList();
        });
    }


    filterExecuters = () => {
        const { existExecutersList } = this.props;
        const { executerList } = this.state;

        return existExecutersList.filter(({ ID }) => !(executerList.find(item => ID === item.ID)));
    }


    render() {
        const { data } = this.props;
        const { isOpen, executerList, currCountExecuters, countExecuter } = this.state;

        const updatedData = { ...data, executerList, currCountExecuters, countExecuter };

        return (
            <ApplicationItem
                data={updatedData}
                handleClick={this.handleClick}
                handleBtns={this.filterHandle()}
                isOpen={isOpen}
                existExecutersList={this.filterExecuters()}
            />
        );
    }
}


const mapStateToProps = state => {
    return {
        userID: selectorsUser.id(state),
        existExecutersList: selectorsUser.existExecuters(state)
    }
}


const mapDispatchToProps = dispatch => {
    const { updatePriority, removeApplication, addExecuterForApp } = bindActionCreators(appActions, dispatch)

    return { removeApplication, updatePriority, addExecuterForApp };
}


export default connect(mapStateToProps, mapDispatchToProps)(ApplicationItemContainer);