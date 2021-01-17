import React from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Typography,
    Divider,
    Select,
    FormControl,
    MenuItem,
    InputLabel,
} from '@material-ui/core';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    date: { marginLeft: theme.spacing(2) },
    rolesSelectable: {
        width: 150,
        marginRight: theme.spacing(3),
    },
}));

function Header({
    name,
    onViewAsChange,
    roles,
    defaultRoleValue,
}) {
    const [age, setAge] = React.useState(defaultRoleValue);

    const handleChange = event => {
        setAge(event.target.value);
        onViewAsChange(event.target.value);
    };

    const classes = useStyles();

    return (
        <>
            <Box className={classes.root}>
                <Box
                    alignItems='flex-end'
                    display='flex'
                    p={3}
                >
                    <Typography variant='h5'>
                        {`Welcome back, ${name}`}
                    </Typography>
                    <Typography
                        className={classes.date}
                        variant='subtitle1'
                    >
                        {moment().format('dddd, D MMMM YYYY')}
                    </Typography>
                </Box>
                {(roles.length > 1 && (
                    <FormControl className={classes.rolesSelectable}>
                        <InputLabel>View As</InputLabel>
                        <Select
                            onChange={handleChange}
                            value={age}
                        >
                            {roles.map(role => (
                                <MenuItem
                                    key={role}
                                    value={role}
                                >
                                    {role}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                ))}
            </Box>
            <Divider />
        </>
    );
}

Header.propTypes = {
    name: PropTypes.string,
    onViewAsChange: PropTypes.func,
    roles: PropTypes.array,
    defaultRoleValue: PropTypes.string.isRequired,
};

Header.defaultProps = {
    name: 'Anonymous',
    onViewAsChange: () => {},
    roles: [],
};

export default Header;
