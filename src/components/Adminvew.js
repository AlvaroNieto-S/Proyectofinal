import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import products from "./Products-data";
import ModProduct from './ModProducts';

const useStyles = makeStyles((theme) => ({
    root: {
        flexFlow : 1,
        padding: "2rem",
    },
}))

const Admin = () => {
    const classes = useStyles();

    function ProductList(){
        return(
            <React.Fragment>
                {products.map((item) => (
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                      <ModProduct key={item.id} product={item} />
                  </Grid>  
                ))}
            </React.Fragment>
        );

    }

    return(
        <div className = {classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography align = "center" gutterBottom variant ='h4' >
                        Admin Panel
                    </Typography>
                </Grid>
                <Grid container spacing={2}>
                    <ProductList/>
                </Grid>
            </Grid>
        </div>
    );
};

export default Admin 