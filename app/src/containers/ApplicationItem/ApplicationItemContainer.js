import React, { Component } from 'react';
import { ApplicationItem } from '../../components/ApplicationList/ApplicationItem/ApplicationItem';


class ApplicationItemContainer extends Component {
    
    render() {
        const { data } = this.props;

        return (
            <ApplicationItem data={data} />
        );
    }
}

export default ApplicationItemContainer;