import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { getBasketTotal } from '../../reducer';
import { useStateValue } from '../../StateProvider';
import accounting from "accounting";


function Review() {
  const [{basket},dispatch] = useStateValue();

  return (
    <>
      <Typography variant='h6' gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {
          basket?.map(producto =>(
            <ListItem key={producto.name}>
              <ListItemText primary ={producto.name} secondary = {`Qty: ${1}`}/>
              <Typography variant="body2">
                {accounting.formatMoney(producto.price,"$")}
              </Typography>
            </ListItem>
          ))
        }
        <ListItem>
          <ListItemText primary ="Total"/>
          <Typography variant="subtitle1">
            {accounting.formatMoney(getBasketTotal(basket),"$")}
          </Typography>
        </ListItem>
      </List>
    </>
  )
}

export default Review
