import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import {useStateValue} from '../StateProvider';
import InCart from "./Incart";
import Total from "./Total";

const useStyles = makeStyles((theme) => ({
    root: {
        flexFlow : 1,
        padding: "2rem",
    },
}))

const ShoppingCart = () => {
    const classes = useStyles();
    const [{basket},dispatch] = useStateValue();

    function ProductList(){
        return(
            <React.Fragment>
                {basket?.map((item) => (
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                      <InCart key={item.id} product={item} />
                  </Grid>  
                ))}
            </React.Fragment>
        );

    }

    return(
        <div className = {classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography align = 'center' gutterBottom variant ='h4' >
                        Shopping Cart
                    </Typography>
                </Grid>
                <Grid item xs ={12} sm = {8} md = {9}container spacing={2}>
                    <ProductList/>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <Typography align='center' gutterBottom variant ='h4'>
                        <Total/>
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default ShoppingCart 