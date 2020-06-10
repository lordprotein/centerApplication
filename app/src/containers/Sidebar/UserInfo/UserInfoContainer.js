import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectorsUser } from '../../../selectors/user';
import { UserInfo } from '../../../components/Sidebar/UserInfo/UserInfo';


class UserInfoContainer extends Component {

    render() {
        const { role, name } = this.props;
        
        return (
            <UserInfo
                name={name}
                role={role}
            />
        );
    }
}


const mapStateToProps = state => {
    return {
        role: selectorsUser.role(state),
        name: selectorsUser.name(state)
    }
}


export default connect(mapStateToProps, null)(UserInfoContainer);