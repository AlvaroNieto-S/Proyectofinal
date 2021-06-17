import { Button, Grid, Typography } from '@material-ui/core';
import {useForm, FormProvider} from 'react-hook-form';
import { Link } from 'react-router-dom';
import AddressInput from './Addressinput';
import {useStateValue} from '../../StateProvider';
import {actionTypes} from '../../reducer';

const AddressForm = ({nexStep} ) => {
  const [{shippingData},dispatch] = useStateValue();
  const methods = useForm();
  return (
    <>
      <Typography variant= 'h6' gutterBottom >
        Shipping address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(data => {
          dispatch({
            type: actionTypes.SET_SHIPPINGDATA,
            shippingData: data, 
          })
          nexStep();
        })}>
          <Grid container spacing={3}>
            <AddressInput required name = "firstName" label ="First Name"/>
            <AddressInput required name = "lastName" label ="Last Name"/>
            <AddressInput required name = "address1" label ="Address"/>
            <AddressInput required name = "email" label ="Email address"/>
            <AddressInput required name = "city" label ="City"/>
            <AddressInput required name = "postCode" label ="Post Code"/>
          </Grid>
          <div style={{display: "flex",justifyContent: "space-between", marginTop:"1rem"}}>
            <Button variant="contained" component={Link} to ="/cart">Regresar al Carrito</Button>
            <Button type="submit" variant="contained" color="primary">Siguiente</Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm
