import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/App/AppContainer';
import { Provider } from 'react-redux';
import { store } from './stores/stores';
import { BrowserRouter } from 'react-router-dom';


const RenderApp = () => {

    return (
        <BrowserRouter>
            <Provider store={store}>
                <React.StrictMode>
                    <AppContainer />
                </React.StrictMode>
            </Provider>
        </BrowserRouter>
    );
}


ReactDOM.render(<RenderApp />, document.getElementById('root'));