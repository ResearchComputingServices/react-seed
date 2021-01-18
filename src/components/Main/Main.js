import _ from 'lodash';
import React, {
    useState,
    useEffect,
    useCallback,
} from 'react';
import clsx from 'clsx';
import {
    ToastsContainer,
    ToastsStore,
} from 'react-toasts';
import { Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    AppBar,
    Toolbar,
    IconButton,
    Box,
    Typography,
} from '@material-ui/core';
import {
    Menu as MenuIcon,
    ExitToApp as ExitToAppIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import MainDrawer from '../MainDrawer';
import {
    Error,
    Logo,
} from '..';
import UserMenu from './UserMenu';
import Authenticating from './Authenticating';
import {
    useMount,
    useActions,
    useStore,
    useService,
    useProvider,
    useIsWideScreenMode,
    useWindowSize,
    useRoutes,
} from '../../hooks';

export const useStyles = makeStyles(theme => ({
    toolbar: {
        paddingLeft: 0,
        paddingRight: 0,
    },
    hamburgerButtonRoot: {
        // Todo need to use appBar height from theme
        height: 64,
        background: 'white',
    },
    hamburgerButton: {
        marginLeft: 2,
        marginRight: 2,
    },
    hamburgerButtonIcon: {
        margin: theme.spacing(1),
        fill: 'black',
    },
    appBar: {
        marginLeft: 20,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        // Todo need to use appBar height from theme
        height: 64,
        alignItems: 'center',
    },
    content: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        paddingTop: 64,
    },
    contentShift: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 265,
        paddingTop: 64,
    },
    hide: { visibility: 'hidden' },
}));
function Main({ authenticate }) {
    const classes = useStyles();
    const dimensions = useWindowSize();
    const [
        interceptorService,
        keycloakService,
        userService,
        historyService,
    ] = useService(
        'interceptor',
        'keycloak',
        'user',
        'history',
    );
    const [error, setError] = useState({
        error: false,
        msg: 'Failed to authenticate user.',
    });
    const [loggingIn, setLogginIn] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const routes = useRoutes('main');
    const routesAssemblerService = useProvider('route')();
    const { open: drawerOpen, enabled: drawerEnabled } = useStore('drawer');
    const { displayName, authenticated } = useStore('userSession');
    const { confirmed: dialogConfirmed, canceled: dialogCanceled, key: dialogKey } = useStore('dialog');
    const { login: loginUser, logout: logoutUser } = useActions('userSession');
    const { toggle: toggleDrawer } = useActions('drawer');
    const { showDialog, hideDialog } = useActions('dialog');
    const { disable: disableDrawer, hide: hideDrawer } = useActions('drawer');
    const wideScreenMode = useIsWideScreenMode();

    useEffect(() => {
        const logout = async () => {
            await keycloakService.logout();
            setLoggingOut(false);
        };
        if (loggingOut) {
            logout();
        }
    }, [keycloakService, setLoggingOut, loggingOut]);

    const fetchUser = async authenticatedUser => {
        if (_.isNil(authenticatedUser)) return null;
        return userService.login();
    };

    const logout = useCallback(async () => {
        try {
            logoutUser();
            hideDrawer();
            setLoggingOut(true);
            historyService.go('/');
        } catch (err) {
            ToastsStore.error('Failed to logout');
        }
    }, [historyService, logoutUser, hideDrawer]);

    const login = async () => {
        if (_.eq(authenticate, false)) {
            return;
        }
        // TODO Keycloak automatically redirects to the keycloak login page when token expires, so this action might never fire. This is a force.
        logoutUser();
        let authenticatedUser = null;
        // The version of Keycloak we are using by itself is broken, we need to catch the error 'kc.login(...).success is not a function'.
        try { authenticatedUser = await keycloakService.login(); } catch (err) {
            if (_.eq(err.name, 'authentication')) {
                return setError({
                    error: true,
                    msg: 'Failed to retrieve authentication token from the Keycloak service.',
                });
            }
        }
        interceptorService.registerRequestInterceptor(request => (request.headers.Authorization = `Bearer ${keycloakService.getToken()}`));
        interceptorService.registerUnauthorizedInterceptor(async () => {
            try {
                logout();
            } catch (err) {}
        });
        const user = await fetchUser(authenticatedUser);
        if (!_.isNil(user)) {
            loginUser(user);
        }
    };

    const confirmLogout = () => {
        if (_.includes(historyService.getUrl(), 'test/wizard')) {
            return showDialog({
                title: 'Your session will be whiped out when you logout, are you sure?',
                key: 'main',
            });
        }
        logout();
    };

    useEffect(() => {
        if (dialogConfirmed && _.eq(dialogKey, 'main')) {
            logout();
            hideDialog();
        }
    }, [dialogConfirmed, hideDialog, dialogKey, logout]);

    useEffect(() => {
        if (dialogCanceled && _.eq(dialogKey, 'main')) {
            hideDialog();
        }
    }, [dialogCanceled, dialogKey, hideDialog]);

    const redirectUserToRelevantRoute = () => {
        const lastVisitedRoute = localStorage.getItem('$lastVisitedRoute');
        // If we left off at a wizard session we should always go back to it.
        if (_.eq(lastVisitedRoute, '/test/wizard')) {
            if (!_.eq(historyService.getUrl(), '/test/wizard')) {
                historyService.go('/test/wizard');
            }
        } else if (!_.isNil(lastVisitedRoute) && !_.eq(lastVisitedRoute, historyService.getUrl())) {
            historyService.go('/dashboard');
        }
    };

    useMount(async () => {
        disableDrawer();
        redirectUserToRelevantRoute();
        // Responsible for parsing all request from camel case to snake case and responses from snake case to camel case.
        interceptorService.registerDataTransformInterceptor();
        interceptorService.registerUnhandledInterceptor(() => console.error('Server failed to send back a response or has crashed.'));
        try {
            setLogginIn(true);
            await login();
            setLogginIn(false);
        } catch (err) {
            setError({
                error: true,
                msg: 'Failed to verify authentication token from the API service.',
            });
        }
    });

    if (error.error) {
        return <Error msg={error.msg} />;
    }

    if (loggingIn) {
        return <Authenticating msg='Logging you in...' />;
    }

    if (loggingOut) {
        return <Authenticating msg='Logging you out...' />;
    }

    if (authenticated) {
        return (
            <>
                <AppBar position='fixed'>
                    <Toolbar className={classes.toolbar}>
                        <Box className={classes.hamburgerButtonRoot}>
                            <IconButton
                                className={clsx(
                                    classes.hamburgerButton,
                                    { hide: !drawerEnabled },
                                )}
                                onClick={() => toggleDrawer()}
                            >
                                <MenuIcon className={classes.hamburgerButtonIcon} />
                            </IconButton>
                        </Box>
                        <Logo />
                        <Box className={classes.appBar}>
                            <Typography
                                className={
                                    clsx(
                                        { [classes.hide]: dimensions.width < 690 },
                                    )
                                }
                                variant='h5'
                            >
                                React Seed
                            </Typography>
                            <UserMenu
                                displayName={displayName}
                                dropdowns={[
                                    authenticated && {
                                        title: 'Logout',
                                        Icon: <ExitToAppIcon />,
                                        handler: confirmLogout,
                                    },
                                ]}
                            />
                        </Box>
                    </Toolbar>
                </AppBar>
                <main className={clsx(
                    { [classes.content]: !drawerEnabled || !drawerOpen || !wideScreenMode },
                    { [classes.contentShift]: drawerEnabled && drawerOpen && wideScreenMode },
                )}
                >
                    <Switch>{routesAssemblerService.assemble(routes)}</Switch>
                    <MainDrawer />
                    <ToastsContainer
                        position='bottom_left'
                        store={ToastsStore}
                    />
                </main>
            </>
        );
    }

    return null;
}

Main.propTypes = { authenticate: PropTypes.bool };
Main.defaultProps = { authenticate: true };

export default Main;
