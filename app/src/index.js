import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/App/AppContainer';
import { Provider } from 'react-redux';
import { store } from './stores/stores';
import { HashRouter } from 'react-router-dom';


const RenderApp = () => {

    return (
        <HashRouter>
            <Provider store={store}>
                <React.StrictMode>
                    <AppContainer />
                </React.StrictMode>
            </Provider>
        </HashRouter>
    );
}


ReactDOM.render(<RenderApp />, document.getElementById('root'));