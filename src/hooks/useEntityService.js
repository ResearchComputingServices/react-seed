import useService from './useService';

// TODO why do we have so many definitions in so many different places
export default function useEntityService(entity) {
    const entityServiceMap = {
        user: {
            service: useService('user'),
            identifierKey: 'name',
        },
        roles: {
            service: useService('roles'),
            identifierKey: 'name',
        },
        userFieldType: {
            service: useService('userFieldType'),
            identifierKey: 'name',
        },
        userField: {
            service: useService('userField'),
            identifierKey: 'display',
        },
        enumeration: {
            service: useService('enumeration'),
            identifierKey: 'name',
        },
    };
    return entityServiceMap[entity];
}
