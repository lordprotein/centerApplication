import React, { Component } from 'react';
import { store } from '../stores/stores';
import { selectorsUser } from '../selectors/user';


const generateAccess = (roleName, WrappedComponent) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                role: this.getRole()
            }
        }

        componentDidMount = () => {
            this.reduxSubscribe(this.updateStatus);
        }

        getRole = () => {
            return selectorsUser.role(store.getState());
        }

        reduxSubscribe = () => store.subscribe(this.updateStatus);

        updateStatus = () => {
            const isRoleRedux = this.getRole();
            const { role } = this.state;

            if (isRoleRedux !== role) this.setState({ role: isRoleRedux });
        }

        render() {
            const { role } = this.state;

            if (role !== roleName) return <></>;
            return <WrappedComponent {...this.props} />
        }
    }
}


export const withAdmin = (WrappedComponent) => generateAccess('Administrator', WrappedComponent);

export const withExecuter = (WrappedComponent) => generateAccess('Executer', WrappedComponent);