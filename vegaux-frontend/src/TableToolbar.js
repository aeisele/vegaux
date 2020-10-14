import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import {lighten, makeStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddBoxIcon from '@material-ui/icons/AddBox';

const useStyles = makeStyles((theme) => ({
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

function TableToolbar(props) {

    const classes = useStyles();

    const {numSelected, caption, itemName, onCreate, onEdit, onDelete} = props;

    const heading = (numSelected > 0) ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
        </Typography>
    ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            {caption}
        </Typography>
    );

    let toolButtons = [(
        <Tooltip key="create-button" title={'Create new ' + itemName}>
            <IconButton aria-label="new" onClick={onCreate}>
                <AddBoxIcon/>
            </IconButton>
        </Tooltip>
    )];

    if (numSelected > 0) {
        toolButtons.push((
            <Tooltip key="edit-button" title="Edit">
                <span>
                    <IconButton aria-label="edit" onClick={onEdit} disabled={numSelected > 1}>
                        <EditIcon/>
                    </IconButton>
                </span>
            </Tooltip>
        ), (
            <Tooltip key="delete-button" title="Delete">
                <IconButton aria-label="delete" onClick={onDelete}>
                    <DeleteIcon/>
                </IconButton>
            </Tooltip>
        ));
    }

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {heading}
            {toolButtons}
        </Toolbar>
    );
}

export default TableToolbar;