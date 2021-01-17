import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Users from '../Users';
import { useService } from '../../hooks';
import { InfiniteList } from '..';
import AdministratorLoggedInUserCard from './AdministratorLoggedInUserCard';

export const useStyles = makeStyles(theme => ({ infiniteList: { marginTop: theme.spacing(1) } }));

function AdministratorDashboard() {
    const userService = useService('user');
    const classes = useStyles();
    return (
        <Box
            display='flex'
            flexWrap='wrap'
        >
            <Box flex={2}>
                <Users />
            </Box>
            <Box flex={1}>
                <InfiniteList
                    className={classes.infiniteList}
                    fetch={userService.getUserSessions}
                    noDataTitle='No active sessions'
                    renderRow={(data, index) => (
                        <AdministratorLoggedInUserCard
                            key={index}
                            displayName={`${data.firstName} ${data.lastName}`}
                            lastAccessTime={moment(data.lastAccessDateTime).format('LLLL')}
                            roles={_.reduce(data.roles, (acc, role) => {
                                acc += role.name;
                                return acc;
                            }, '')}
                            sessionStartTime={moment(data.sessionStartTime).format('LLLL')}
                            username={data.name}
                        />
                    )}
                    title='Logged in Users'
                />
            </Box>
        </Box>
    );
}

export default AdministratorDashboard;
