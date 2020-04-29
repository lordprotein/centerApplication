import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/App/AppContainer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers/reducers';
import App from './containers/App/AppContainer';


const RenderApp = () => {
    const store = createStore(reducers);

    return (
        <Provider store={store}>
            <React.StrictMode>
                <AppContainer />
            </React.StrictMode>,
        </Provider>
    );
}


ReactDOM.render(<RenderApp />, document.getElementById('root'));