import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/App/AppContainer';
import { Provider } from 'react-redux';
import { store } from './stores/stores';


const RenderApp = () => {

    return (
        <Provider store={store}>
            <React.StrictMode>
                <AppContainer />
            </React.StrictMode>
        </Provider>
    );
}


ReactDOM.render(<RenderApp />, document.getElementById('root'));