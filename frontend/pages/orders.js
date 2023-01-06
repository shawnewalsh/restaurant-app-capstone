/* /pages/orders.js */
import React, { useState, useContext } from "react";

import { Col, Input, InputGroup, InputGroupAddon, Row } from "reactstrap";
import OrderList from "../components/OrderList";
import AppContext from "../context/AppContext";



function Orders() {
    const appContext = useContext(AppContext);
    console.log(`appcontext is ${JSON.stringify(appContext.user.username)}`);
    const userquery = appContext.user.username;
    console.log(`user query is ${userquery}`);

    return (
     
        <div>
        <OrderList search={userquery}/>
        </div>
     
    )
}

export default Orders;