const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const stripe = new Stripe("sk_test_51J1BLvFin91vMXQPi3kZN6aC0jkJn7HQXucbUpGr6zEYGetriaUkvAOqbl9SpfBYKa2wk7zPd3WaQr7OvSxWkOOE000RSd2k2J");


const app= express();

app.use(cors({origin: "http://localhost:3000"}));

app.use(express.json());

app.post("/api/checkout", async(req,res) => {
    console.log(req.body);
    const {id,amount} = req.body;

    try{
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Basket of Products",
            confirm: true,
        })
        console.log(payment)
        return res.status(200).json({message: "Succesful Payment"})

    }catch(error){
        return res.json({message: error.raw.message})
    }
})

app.listen(3001, () => console.log("Server Listening port",3001));


