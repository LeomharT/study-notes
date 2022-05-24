import { createStyles } from '@mantine/core';
import React from 'react';
const useStyles = createStyles((theme, _params, getRef) => ({
    style1: {
        width: 500,
        height: 500,
        background: theme.colors.pink,
        margin: '50px auto',
        'border-radius': 50,
    }
}));

export default function NewPage()
{
    const { classes } = useStyles();
    return (

        <div className={classes.style1}>
            {/* <Buttondemo /> */}
        </div>
    );
}
