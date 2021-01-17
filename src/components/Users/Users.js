import React from 'react';
import FileSaver from 'file-saver';
import UsersGrid from './Grid';
import { Layout } from '..';
import { useGridActions, useGridButtons } from '../../hooks';

export default function Users() {
    const rights = {
        create: '*',
        export: '*',
        import: '*',
    };
    const actions = useGridActions('users', {
        import: file => {
            const blob = new Blob(
                [file],
                { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
            );
            FileSaver.saveAs(blob, 'user-import-report.xlsx');
        },
    });
    const buttons = useGridButtons(actions, rights);
    return (
        <Layout my={4}>
            <UsersGrid {...buttons} />
        </Layout>
    );
}
