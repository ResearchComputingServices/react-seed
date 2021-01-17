import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
    IconButton,
    Input,
    InputLabel,
    InputAdornment,
    FormControl,
    Box,
} from '@material-ui/core';
import {
    Visibility,
    VisibilityOff,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Button, ModalInfo } from '..';
import { useStyles as useFormStyles } from '../Form';

export const useStyles = makeStyles(theme => ({ marginRight: theme.spacing(4) }));

function SetTemporaryPasswordModal({ className, onSetTemporaryPassword }) {
    const [show, setShow] = React.useState(false);
    const formClasses = useFormStyles();
    const classes = useStyles();
    const getInitialState = () => ({
        password: '',
        showPassword: false,
        confirmPassword: '',
        showConfirmPassword: false,
    });
    const [values, setValues] = React.useState(getInitialState());

    React.useEffect(() => {
        if (show) {
            setValues(getInitialState());
        }
    }, [show, setValues]);

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const handleClickShowConfirmPassword = () => {
        setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
    };

    const handleMouseDownConfirmPassword = event => {
        event.preventDefault();
    };

    const passwordMisMatch = () => !_.eq(values.confirmPassword, values.password);

    const onKeyDown = event => {
        if (_.eq(event.which, 13)) {
            onSetTemporaryPassword(values.password, () => setShow(false));
        }
    };

    return (
        <>
            <Button
                className={className}
                color='primary'
                onClick={() => setShow(true)}
                variant='contained'
            >
                Set Temporary Password
            </Button>
            <ModalInfo
                buttons={[
                    {
                        props: {
                            className: classes.marginRight,
                            color: 'primary',
                            variant: 'contained',
                            disabled: _.isEmpty(values.password) || passwordMisMatch(),
                        },
                        name: 'change',
                        title: 'Set Password',
                        onClick: () => onSetTemporaryPassword(values.password, () => setShow(false)),
                    },
                    {
                        props: {
                            color: 'primary',
                            variant: 'contained',
                        },
                        name: 'cancel',
                        hideModal: true,
                        title: 'Cancel',
                    },
                ]}
                onHide={() => setShow(false)}
                show={show}
                title='Set Temporary Password'
            >
                <Box
                    display='flex'
                    flexDirection='column'
                    onKeyDown={_.isEmpty(values.password) || passwordMisMatch() ? undefined : onKeyDown}
                    role='presentation'
                >
                    <FormControl
                        className={formClasses.field}
                        error={passwordMisMatch()}
                    >
                        <InputLabel htmlFor='standard-adornment-password'>Password</InputLabel>
                        <Input
                            endAdornment={(
                                <InputAdornment position='end'>
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        tabIndex={-1}
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )}
                            onChange={handleChange('password')}
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                        />
                    </FormControl>
                    <FormControl
                        className={formClasses.field}
                        error={passwordMisMatch()}
                    >
                        <InputLabel htmlFor='standard-adornment-password'>Confirm Password</InputLabel>
                        <Input
                            endAdornment={(
                                <InputAdornment position='end'>
                                    <IconButton
                                        disableRipple
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownConfirmPassword}
                                        tabIndex={-1}
                                    >
                                        {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )}
                            onChange={handleChange('confirmPassword')}
                            type={values.showConfirmPassword ? 'text' : 'password'}
                            value={values.confirmPassword}
                        />
                    </FormControl>
                </Box>
            </ModalInfo>
        </>
    );
}

SetTemporaryPasswordModal.propTypes = {
    className: PropTypes.string,
    onSetTemporaryPassword: PropTypes.func,
};

SetTemporaryPasswordModal.defaultProps = {
    className: '',
    onSetTemporaryPassword: () => {},
};

export default SetTemporaryPasswordModal;
