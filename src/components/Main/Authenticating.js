import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { Ripple } from '..';

const Authenticating = ({ msg }) => (
    <Box
        alignItems='center'
        display='flex'
        flexDirection='column'
        height='90vh'
        justifyContent='center'
        width='100vw'
    >
        <Ripple />
        {msg}
    </Box>
);

Authenticating.propTypes = { msg: PropTypes.string };

Authenticating.defaultProps = { msg: 'Processing your request, one moment...' };

export default Authenticating;
