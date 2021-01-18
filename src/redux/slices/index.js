import _ from 'lodash';
import userSession from './userSession';
import dialog from './dialog';
import drawer from './drawer';
import dashboard from './dashboard';
import theme from './theme';
import { logout } from '../globalActions';

export const actions = {
    userSession: _.assign(userSession.actions, { logout }),
    dialog: dialog.actions,
    drawer: drawer.actions,
    dashboard: dashboard.actions,
    theme: theme.actions,
};

export const reducers = {
    userSession: userSession.reducer,
    dialog: dialog.reducer,
    drawer: drawer.reducer,
    dashboard: dashboard.reducer,
    theme: theme.reducer,
};
