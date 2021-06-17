import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import accounting from "accounting";
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router';
import {useStateValue} from '../StateProvider';
import {actionTypes} from '../reducer';



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  action:{
    marginTop: "3rem",
  },
  media: {
    height: 0,
    paddingTop: '100%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  cardActions: {
      display: "flex",
      justifyContent: "space-between",
      textAlign: "center",
  },
  cardRating: {
      display: "flex",
  },
}));

export default function ModProduct({product: {id, name, productType, price, rating, image, description}}) {
  const classes = useStyles();
  var indi=0;
  const history = useHistory();
  const [{basket},dispatch] = useStateValue();

  const removeItem = () => dispatch({
    type: actionTypes.REMOVE_ITEM,
    id: id,
  })

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <Typography
            className = {classes.action}
            variant = 'h5'
            color='textSecondary'
          >
            {accounting.formatMoney(price, "$")}
          </Typography>
        }
        title={name}
        subheader="Disponible"
      />
      <CardMedia
        className={classes.media}
        image={image}
        title={name}
      />
      <CardActions disableSpacing className = {classes.cardActions}>
        <div className ={classes.cardRating}>
        {Array(rating)
          .fill()
          .map((_, i) => (
            <p>&#11088;</p>
          ))}
        </div>
        <IconButton>
        <DeleteIcon frontsize= "large" onClick={removeItem}/>
        </IconButton>
      </CardActions>
    </Card>
  );
}
