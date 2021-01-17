import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import Main from '../Main';
import store from '../../redux/store';
import { useService } from '../../hooks';

export default function() {
    const historyService = useService('history');
    const App = () => (
        <Provider store={store}>
            <CssBaseline />
            <Router history={historyService.getHistory()}>
                <Main />
            </Router>
        </Provider>
    );
    return (
        <App />
    );
}
