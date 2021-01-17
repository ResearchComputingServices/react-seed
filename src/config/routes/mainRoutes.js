import Users from '../../components/Users';
import User from '../../components/User';
import NotFound from '../../components/NotFound';
import UserField from '../../components/UserField';
import UserFields from '../../components/UserFields';
import Enumerations from '../../components/Enumerations';
import Enumeration from '../../components/Enumeration';
import UserFieldTypes from '../../components/UserFieldTypes';
import UserFieldType from '../../components/UserFieldType';
import Roles from '../../components/Roles';
import Dashboard from '../../components/Dashboard';

export default [
    {
        path: '/',
        component: Dashboard,
        roles: '*',
    },
    {
        path: '/dashboard',
        component: Dashboard,
        roles: '*',
    },
    {
        path: '/users',
        component: Users,
        roles: '*',
    },
    {
        path: '/users/user',
        component: User,
        roles: '*',
    },
    {
        path: '/users/user/:id',
        component: User,
        roles: '*',
    },
    {
        path: '/user-fields/',
        component: UserFields,
        roles: '*',
    },
    {
        path: '/user-fields/user-field',
        component: UserField,
        roles: '*',
    },
    {
        path: '/user-fields/user-field/:id',
        component: UserField,
        roles: '*',
    },
    {
        path: '/enumerations/',
        component: Enumerations,
        roles: '*',
    },
    {
        path: '/enumerations/enumeration',
        component: Enumeration,
        roles: '*',
    },
    {
        path: '/enumerations/enumeration/:id',
        component: Enumeration,
        roles: '*',
    },
    {
        path: '/user-field-types/',
        component: UserFieldTypes,
        roles: '*',
    },
    {
        path: '/user-field-types/user-field-type',
        component: UserFieldType,
        roles: '*',
    },
    {
        path: '/user-field-types/user-field-type/:id',
        component: UserFieldType,
        roles: '*',
    },
    {
        path: '/roles/',
        component: Roles,
        roles: '*',
    },
    {
        path: '*',
        component: NotFound,
        roles: '*',
    },
];
