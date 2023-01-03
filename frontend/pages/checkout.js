/* pages/checkout.js */

import React, { useContext } from "react";

import { Row, Col } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import InjectedCheckoutForm from "../components/checkout/CheckoutForm";
import AppContext from "../context/AppContext";

import Cart from "../components/cart/";

function Checkout() {
  // get app context
  const appContext = useContext(AppContext);
  // isAuthenticated is passed to the cart component to display order button
  const { isAuthenticated } = appContext;
  const { username } = appContext;

  // load stripe to inject into elements components
  const stripePromise = loadStripe("pk_test_51MDz68Dc1CPjDpJ78iJXbxGaZmEqvKz4WG6h9LPUXmVDOFSEHEHdeGpSFJP76SUwTfDPNU7uRJVER3AQ5Sq3N16W00XTa69eOS");
  // console.log(`appcontext is ${JSON.stringify(appContext.user.username)}`);

  return (
    <Row>
      <Col style={{ paddingRight: 0 }} sm={{ size: 3, order: 1, offset: 2 }}>
        <h1 style={{ margin: 20 }}>Checkout</h1>
        <Cart isAuthenticated={isAuthenticated} />
      </Col>
      <Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
        <Elements stripe={stripePromise}>
          <InjectedCheckoutForm />
        </Elements>
      </Col>
    </Row>
  );
  // }
}
export default Checkout;