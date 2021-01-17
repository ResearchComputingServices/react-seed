import {
    Person as PersonIcon,
    Settings as SettingsIcon,
    Dashboard as DashboardIcon,
} from '@material-ui/icons';

export default [
    {
        path: '/dashboard',
        title: 'Dashboard',
        roles: '*',
        Icon: DashboardIcon,
    },
    {
        path: '/users',
        title: 'Users',
        Icon: PersonIcon,
        roles: '*',
    },
    {
        name: 'settings',
        title: 'Settings',
        Icon: SettingsIcon,
        items: [
            {
                path: '/user-fields/',
                title: 'User Fields',
                roles: '*',
            },
            {
                path: '/user-field-types/',
                title: 'User Field Types',
                roles: '*',
            },
            {
                path: '/enumerations/',
                title: 'Enumerations',
                roles: '*',
            },
            {
                path: '/roles/',
                title: 'Roles',
                roles: '*',
            },
        ],
    },
];
