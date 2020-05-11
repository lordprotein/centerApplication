import React, { Component } from 'react';
import { ApplicationItem } from '../../../components/ApplicationList/ApplicationItem/ApplicationItem';
import { service } from '../../../service/service';
import { removeApplication } from '../../../actions/applicationActions';
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


    filterHandle = () => {
        const { data: { status } } = this.props;
        const accept = this.handleAccept;
        const reset = this.handleReset;
        const remove = this.handleRemove;
        const complete = this.handleComplete;

        switch (status) {
            case menuTitleList[0].status: {
                return { accept, remove };
            }
            case menuTitleList[1].status: {
                return { reset, remove, complete };
            }
            default: return;
        }
    }


    render() {
        const { data } = this.props;
        const { isSlideDown } = this.state;

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
    return {
        removeApplication: bindActionCreators(removeApplication, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ApplicationItemContainer);