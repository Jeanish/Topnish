import React from 'react'
import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js"

function PaypalButton({amount, onSuccess, onError}) {
  return (
    <PayPalScriptProvider options={{"client-id":"AV3dcoOgEUPcLzD4z97hlX0-J2lhk4JRaU-YVP8Q7nyBQd-L_qfHqIAj5Zm4XJLObw2xXEtllH-Ew-vq"}}>

        <PayPalButtons style={{layout: "vertical"}} createOrder={(data, actions)=>{
            return actions.order.create({
                purchase_units: [{amount: {value: parseFloat(amount).toFixed(2)}}]
            })

            
        }}
        
        onApprove={(data,actions) => {
            return actions.order.capture().then(onSuccess)
        }}
        
        onError={onError}/>

    </PayPalScriptProvider>
  )
}

export default PaypalButton