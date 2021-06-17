import React, { useRef, useEffect } from "react";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";

export default function Paypal({amount,nexStep}) {
  const paypal = useRef();
  const [{paymentMessage}, dispatch] = useStateValue();

  useEffect(() => {
    window.paypal.Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Your product list",
                amount: {
                  currency_code: "USD",
                  value: amount,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          dispatch({
            type: actionTypes.SET_PAYMENTMESSAGE,
            paymentMessage: "Successful Payment",
          })
          dispatch({
            type: actionTypes.EMPTY_BASKET,
            basket: [],
          })
          dispatch({
              type: actionTypes.SET_COMPLETEORDER,
              completeOrder: true,
          })
        },
        onError: (err) => {
            dispatch({
                type: actionTypes.SET_PAYMENTMESSAGE,
                paymentMessage: `Error Payment ${err}`,
            })
            dispatch({
                type: actionTypes.SET_COMPLETEORDER,
                completeOrder: true,
            })
        },
      }).render(paypal.current);
  }, []);

  return (
    <>
      <div ref={paypal}> </div>
    </>
  );
}