import React, { Component } from 'react';
import { ApplicationItem } from '../../../components/ApplicationList/ApplicationItem/ApplicationItem';
import { service } from '../../../service/service';
import { removeApplication } from '../../../actions/applicationActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectorsUser } from '../../../selectors/user';


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
            .then(res => {
                removeApplication(id);
                console.log(res);
            })
    }

    render() {
        const { data } = this.props;
        const { isSlideDown } = this.state;

        const handleBtns = {
            accept: this.handleAccept,
            reset: this.handleReset
        }

        return (
            <ApplicationItem
                data={data}
                handleClick={this.handleClick}
                handleBtns={handleBtns}
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