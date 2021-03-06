import CircularProgress from '@material-ui/core/CircularProgress'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import React from 'react';
import "./loader.scss";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            flex: '1 0 auto',
        },
        progress: {
            margin: theme.spacing(2),
        },
    })
)
export const TransparentLoader = () => {
    const classes = useStyles()
    return (
        <div className="mainLoader">
            <CircularProgress className={classes.progress} />
        </div>
    )
}


export const LoadingView = () => {
    return (
        <div className="loader-container">
            <CircularProgress />
            {/* <img src="../../../../assets/images/loader3.gif" /> */}
        </div>
    );
};

