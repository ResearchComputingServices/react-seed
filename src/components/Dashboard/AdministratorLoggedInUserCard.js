import React from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
        margin: theme.spacing(1),
    },
    title: {
        display: 'inline-block',
        marginBottom: theme.spacing(1),
        fontSize: 16,
    },
    cardPos: { marginBottom: theme.spacing(1) },
    displayName: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
}));

function AdministratorLoggedInUserCard({
    className,
    style,
    username,
    roles,
    displayName,
    sessionStartTime,
    lastAccessTime,
}) {
    const classes = useStyles();
    return (
        <Card
            className={clsx(classes.root, className)}
            style={style}
        >
            <CardContent>
                <Typography
                    className={classes.title}
                    color='textSecondary'
                    gutterBottom
                >
                    Username:
                    {' '}
                    {username}
                </Typography>
                <Typography
                    className={classes.displayName}
                    component='h2'
                    variant='h5'
                >
                    {displayName}
                </Typography>
                <Typography
                    className={classes.cardPos}
                    color='textSecondary'
                >
                    Roles:
                    {' '}
                    {roles}
                </Typography>
                <Typography
                    className={classes.cardPos}
                    color='textSecondary'
                >
                    Session Start Time:
                    {' '}
                    {sessionStartTime}
                </Typography>
                <Typography
                    className={classes.cardPos}
                    color='textSecondary'
                >
                    Last Access Time:
                    {' '}
                    {lastAccessTime}
                </Typography>
            </CardContent>
        </Card>
    );
}

AdministratorLoggedInUserCard.propTypes = {
    username: PropTypes.string,
    roles: PropTypes.string,
    displayName: PropTypes.string,
    sessionStartTime: PropTypes.string,
    lastAccessTime: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
};

AdministratorLoggedInUserCard.defaultProps = {
    username: 'Unknown',
    roles: 'Unknown',
    displayName: 'Unknown',
    sessionStartTime: 'Unknown',
    lastAccessTime: 'Unknown',
    className: undefined,
    style: undefined,
};

export default AdministratorLoggedInUserCard;
