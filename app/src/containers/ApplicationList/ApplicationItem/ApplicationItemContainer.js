import React, { Component } from 'react';
import { ApplicationItem } from '../../../components/ApplicationList/ApplicationItem/ApplicationItem';
import { service } from '../../../service/service';
import { removeApplication } from '../../../actions/applicationActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


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
        const { data: { id }, removeApplication } = this.props;


        service.postAcceptApp('386155e0-ffa7-4baf-adf8-2b88d8455e8e', id)
            .then(res => removeApplication(id));
    }

    render() {
        const { data } = this.props;
        const { isSlideDown } = this.state;

        return (
            <ApplicationItem
                data={data}
                handleClick={this.handleClick}
                handleAccept={this.handleAccept}
                isSlideDown={isSlideDown}
            />
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        removeApplication: bindActionCreators(removeApplication, dispatch)
    }
}


export default connect(null, mapDispatchToProps)(ApplicationItemContainer);