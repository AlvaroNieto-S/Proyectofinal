import React from 'react'
import accounting from "accounting";
import { Button, makeStyles} from '@material-ui/core';
import { getBasketTotal } from '../reducer';
import {useStateValue} from '../StateProvider';
import {useHistory} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "20vh",
    },
    button: {
        marginTop: "2rem",
    }
}))

const Total = () => {
    const history = useHistory();

    const check = () =>{
        history.push('/checkout');
    }

    const [{basket},dispatch] = useStateValue();
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <h5>
                Productos Totales: {basket?.length}
            </h5>
            <h5>
                {accounting.formatMoney(getBasketTotal(basket),"$")}
            </h5>
            <Button classname={classes.button} variant="contained" color="primary" onClick = {check}>
                Comprar
            </Button>
            
        </div>
    )
}

export default Total

