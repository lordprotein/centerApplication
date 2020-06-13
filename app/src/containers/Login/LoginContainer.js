import React, { Component } from 'react';
import { Login } from '../../components/Login/Login';
import { connect } from 'react-redux';
import { service } from '../../service/service';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import { selectorsUser } from '../../selectors/user';
import linker from '../../service/linker';
import { myCookieUser, myCookieIsLogin } from '../../service/myCookie';


class LoginContainer extends Component {
    state = {
        login: '',
        password: '',
        errorText: ''
    }

    handleLogin = e => {
        const { value } = e.target;
        this.setState({ login: value });
    }

    handlePassword = e => {
        const { value } = e.target;

        this.setState({ password: value });
    }

    successfulAuth = (data, history) => {
        const { doLogin } = this.props;

        
        doLogin(data);
        
        myCookieUser.set({ ...data });
        myCookieIsLogin.set(true);
        
        if (data.role === 'User') return history.push('/application/add')
        history.push(linker('Свободные'))
    }

    handleSend = (history) => {
        const { login, password } = this.state;

        service.login(login, password)
            .then(
                data => {
                    if (data.status === false) return;
                    this.successfulAuth(data, history);
                },
                err => {
                    if (err === 403) this.setState({ errorText: 'Неправильный логин или пароль' });
                    
                }
            );
    }

    render() {
        const { errorText } = this.state;

        return (
            <Login
                handleLogin={this.handleLogin}
                handlePassword={this.handlePassword}
                handleSend={this.handleSend}
                errorText={errorText}
            />
        );
    }
}

const mapStateToProps = state => {
    return { loginStatus: selectorsUser.getAllInfo(state) }
}


const mapDispatchToProps = dispatch => {
    const { login } = bindActionCreators(userActions, dispatch);

    return { doLogin: login };
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);