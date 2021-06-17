import Review from './Review';
import {Button, Divider, Typography, CircularProgress, Link} from '@material-ui/core';
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { useStateValue } from '../../StateProvider';
import accounting from 'accounting';
import { actionTypes, getBasketTotal } from '../../reducer';
import axios from "axios";
import { useState } from 'react';
import PayPal from "./PayPal";

const stripePromise = loadStripe("pk_test_51J1BLvFin91vMXQPAfXBdLfa4Wi4WGD1P3lwuD55udru8yHWR58kTjj9AiMjmwfQY7Q29jBBPOFtmYndbTOtxYIt00QB7cPrGG")

const CARD_ELEMENT_OPTIONS ={
  iconStyle: "solid",
  hidePostalCode: true,
  style:{
    base:{
      iconColor: "rgb(240, 57, 122)",
      color: "#333",
      frontSize: "18px",
      "::placeholder":{
        color:"#ccc",
      },
    },
    invalid: {
      color: "#e5424d",
      ":focus":{
        color: "#303238"
      },
    },
  },
}

const CheckoutForm = ({backStep,nexStep}) =>{
  const [{basket,paymentMessage},dispatch]=useStateValue();
  const [checkout,setCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  //const stripe = useStripe();
  //const elements = useElements();
  /*
  const handleSubmit= async(e) =>{
    e.preventDefault();
    const [checkout,setCheckout] = useState(false);
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type:"card",
      card: elements.getElement(CardElement),
    })
    setLoading(true);
    if(!error){
      const { id } = paymentMethod;
      try {
        const {data} = await axios.post("http://localhost:3001/api/checkout",{
          id,
          amount: getBasketTotal(basket) * 100,
        })
        dispatch({
          type: actionTypes.SET_PAYMENTMESSAGE,
          paymentMessage: data.message,
        });
        if(data.message === "Succesful Payment"){
          dispatch({
            type: actionTypes.EMPTY_BASKET,
            basket: [],
          });
        }
        elements.getElement(CardElement).clear();
        nexStep();
      } catch (error) {
        console.log(error)
        nexStep();
      }
      
    }
    setLoading(false);
  }
  */
  return(
    <>
    {checkout ? (
        <PayPal amount = {getBasketTotal(basket)} nexStep = {nexStep}/>

      ) : (
        <Button variant="contained" color="primary"
          onClick={() => {
            setCheckout(true);
          }}
        >{
          loading ? (<CircularProgress/>) :
          (` Pagar: ${accounting.formatMoney(getBasketTotal(basket),"$")} with PayPal`)
        }
        </Button>
        
      )}
    {/*checkout ? (<PayPal amount ={getBasketTotal(basket)} /> ) : (
      <form onSubmit = {setCheckout(true)}>
        <Button type = "submit" variant="contained" color="primary">
            {
              loading ? (<CircularProgress/>) :
              (` Pagar: ${accounting.formatMoney(getBasketTotal(basket),"$")} with PayPal`)
            }
        </Button>
      </form>
    ) }
    
      {/*
      onSubmit={handleSubmit} in form
      <CardElement options={CARD_ELEMENT_OPTIONS}/>
      <div style={{display: "flex", justifyContent: "space-between",marginTop:"1rem"}}>
      <Button variant="contained" onClick={backStep}>Regresar</Button>
      <Button type="submit" variant="contained" color="primary"> 
      {
        loading ? (<CircularProgress/>) :
        (` Pagar: ${accounting.formatMoney(getBasketTotal(basket),"$")}`)
      }
      </Button>
      </div>
    */}
    </>
  )
}


function PaymentForm({nexStep, backStep}) {
  const [{completeOrder,basket},dispatch] = useStateValue();
  const Next = () =>{
    if(completeOrder){
      nexStep();
      dispatch({
        type: actionTypes.SET_COMPLETEORDER,
        completeOrder: false,
      })
    }
  }
  return (
    <>
    <Review/>
    <Divider/>
    <Typography variant='h6' gutterBottom style={{margin:"20px 0"}}>  
      Payment Method
    </Typography>
    <Elements stripe={stripePromise}>
      <PayPal amount = {getBasketTotal(basket)}/>
    </Elements>
    <Divider/>
    <Button variant="contained" color="primary" onClick = {Next}>
      {completeOrder ? "Continue"  : "Complete Your Payment"}
    </Button>
    </>
  )
}

export default PaymentForm
