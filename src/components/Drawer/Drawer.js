import _ from 'lodash';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    ChevronLeft as ChevronLeftIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
} from '@material-ui/icons';
import clsx from 'clsx';
import {
    Collapse,
    ListItem,
    IconButton,
    Drawer,
    Divider,
    List,
    Box,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Logo } from '..';
import {
    useMount,
    useUnmount,
    useStore,
    useActions,
    useIsWideScreenMode,
} from '../../hooks';

export const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
        // TODO needs to be in theme
        width: 272,
        border: '1px solid rgba(0, 0, 0, 0.1)',
        scrollbarWidth: 'none',
    },
    expandArrow: { fontSize: '1.2rem' },
    expandArrowExpanded: {
        color: theme.palette.primary.main,
        fontWeight: 'bold',
    },
    item: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(2),
    },
    itemContent: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1),
        width: '100%',
    },
    itemIcon: { marginRight: 6 },
    itemText: { padding: theme.spacing(2) },
    logo: {
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(1),
        // TODO - need to put app bar height in theme
        height: 64,
    },
    closeButton: { color: 'black' },
}));

function DrawerItem({
    depthStep,
    depth,
    expanded,
    item,
    open,
    onClick: onClickProp,
    ...rest
}) {
    const wideScreenMode = useIsWideScreenMode();
    const [collapsed, setCollapsed] = useState(!open);
    const { title, items, path, Icon } = item;
    const { toggle } = useActions('drawer');
    const classes = useStyles();

    function toggleCollapse() {
        setCollapsed(prevValue => !prevValue);
    }

    function onClick(e) {
        if (Array.isArray(items)) {
            toggleCollapse();
        } else if (!wideScreenMode) {
            toggle();
        }
        if (onClick) {
            onClickProp(e, path);
        }
    }

    let expandIcon;

    if (Array.isArray(items) && items.length) {
        expandIcon = !collapsed ? (
            <ExpandLessIcon className={clsx(classes.expandArrow, classes.expandArrowExpanded)} />
        ) : (
            <ExpandMoreIcon className={classes.expandArrow} />
        );
    }

    return (
        <>
            <ListItem
                button
                className={classes.item}
                dense
                onClick={onClick}
                {...rest}
            >
                <Box
                    className={classes.itemContent}
                    style={{ paddingLeft: depth * depthStep }}
                >
                    {Icon && (
                        <Icon
                            className={classes.itemIcon}
                            fontSize='small'
                        />
                    )}
                    <Typography className={classes.itemText}>
                        {title}
                    </Typography>
                </Box>
                {expandIcon}
            </ListItem>
            <Collapse
                in={!collapsed}
                timeout='auto'
                unmountOnExit
            >
                {Array.isArray(items) ? (
                    <List
                        dense
                        disablePadding
                    >
                        {_.map(items, (subItem, index) => (
                            <React.Fragment key={`${subItem.name}${index}`}>
                                {_.eq(subItem, 'Boxider') ? (
                                    <Divider />
                                ) : (
                                    <DrawerItem
                                        depth={depth + 1}
                                        depthStep={depthStep}
                                        item={subItem}
                                        onClick={onClickProp}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </List>
                ) : null}
            </Collapse>
        </>
    );
}

function CustomDrawer({
    depthStep,
    expanded,
    items,
    depth,
    onItemClick,
    classes: classesProps,
    className,
    style,
}) {
    const classes = useStyles();
    const { open = false } = useStore('drawer');
    const { enable = _.noop, disable = _.noop, toggle = _.noop } = useActions('drawer');

    useMount(enable);
    useUnmount(disable);

    return (
        <Drawer
            anchor='left'
            classes={{ ...classesProps, paper: `${classes.root} MuiPaper-elevation2` }}
            className={className}
            open={open}
            style={style}
            variant='persistent'
        >
            <Box className={classes.logo}>
                <IconButton
                    className={classes.closeButton}
                    onClick={() => toggle()}
                >
                    <ChevronLeftIcon />
                </IconButton>
                <Logo />
            </Box>
            <Divider />
            <List>
                {_.map(items, (drawerItem, index) => (
                    <React.Fragment key={`${drawerItem.name}${index}`}>
                        {_.eq(drawerItem, 'Boxider') ? (
                            <Divider />
                        ) : (
                            <DrawerItem
                                depth={depth}
                                depthStep={depthStep}
                                expanded={expanded}
                                item={drawerItem}
                                onClick={onItemClick}
                            />
                        )}
                    </React.Fragment>
                ))}
            </List>
        </Drawer>

    );
}

DrawerItem.propTypes = {
    depthStep: PropTypes.number,
    depth: PropTypes.number,
    expanded: PropTypes.bool,
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    open: PropTypes.bool,
};

DrawerItem.defaultProps = {
    depthStep: 10,
    depth: 0,
    expanded: undefined,
    open: true,
};

CustomDrawer.propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    depthStep: PropTypes.number,
    depth: PropTypes.number,
    expanded: PropTypes.bool,
    items: PropTypes.array,
    onItemClick: PropTypes.func,
    classes: PropTypes.object,
};

CustomDrawer.defaultProps = {
    style: undefined,
    className: undefined,
    items: [],
    onItemClick: _.noop,
    depthStep: 10,
    depth: 0,
    expanded: undefined,
    classes: {},
};

export default CustomDrawer;
