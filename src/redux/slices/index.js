import _ from 'lodash';
import userSession from './userSession';
import timer from './timer';
import dialog from './dialog';
import drawer from './drawer';
import dashboard from './dashboard';
import { logout } from '../globalActions';

export const actions = {
    userSession: _.assign(userSession.actions, { logout }),
    timer: timer.actions,
    dialog: dialog.actions,
    drawer: drawer.actions,
    dashboard: dashboard.actions,
};

export const reducers = {
    userSession: userSession.reducer,
    timer: timer.reducer,
    dialog: dialog.reducer,
    drawer: drawer.reducer,
    dashboard: dashboard.reducer,
};
