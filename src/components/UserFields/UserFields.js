import React from 'react';
import { Layout } from '..';
import UserFieldsGrid from './Grid';
import { useGridActions, useGridButtons } from '../../hooks';

export default function UserFields() {
    const rights = {
        create: '*',
        export: '*',
        import: '*',
    };
    const actions = useGridActions('userFields');
    const buttons = useGridButtons(actions, rights);

    return (
        <Layout my={4}>
            <UserFieldsGrid {...buttons} />
        </Layout>
    );
}
