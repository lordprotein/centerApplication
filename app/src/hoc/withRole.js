import React, { Component } from 'react';
import { store } from '../stores/stores';


const generateAccess = roleName => {
    return WrappedComponent => {
        return class extends Component {
            constructor(props) {
                super(props);
                this.state = {
                    role: this.getRole()
                }
                this.reduxSubscribe(this.updateStatus);
            }
    
            getRole = () => {
                return store.getState().data.userInfo.role;
            }
    
            reduxSubscribe = () => store.subscribe(this.updateStatus);
    
            updateStatus = () => {
                const isRoleRedux = this.getRole();
                const { role } = this.state;
    
                if (isRoleRedux !== role) this.setState({ role: isRoleRedux });
            }
    
            render() {
                if (role !== roleName) return;
    
                return <WrappedComponent {...this.props} />
            }
        }
    }
}


export const withAdmin = generateAccess('administrator');
export const withExecuter = generateAccess('executer');