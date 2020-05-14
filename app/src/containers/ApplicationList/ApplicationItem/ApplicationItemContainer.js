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
        isSlideDown: false
    }


    handleClick = () => {
        this.setState(({ isSlideDown }) => {
            return { isSlideDown: !isSlideDown }
        })
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
        const { data } = this.props;
        const { isSlideDown } = this.state;
        // console.log(data.priority)
        return (
            <ApplicationItem
                data={data}
                handleClick={this.handleClick}
                handleBtns={this.filterHandle()}
                isSlideDown={isSlideDown}
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
    const { updatePriority, removeApplication } = bindActionCreators(appActions, dispatch)

    return { removeApplication, updatePriority };
}


export default connect(mapStateToProps, mapDispatchToProps)(ApplicationItemContainer);