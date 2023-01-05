import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { gql } from "apollo-boost";
import AppContext from "../context/AppContext";

import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    Col,
    Row,
  } from "reactstrap";
  
const QUERY = gql`
{
    orders {
      amount
      createdAt
      dishes
      user {
        username
      }
    }
  }
`;

function pastOrders() {
    const appContext = useContext(AppContext);
    const router = useRouter();
    const { loading, error, data } = useQuery(QUERY);
    // will put a variable for search here...

    if (error) return "Error loading your orders";
    if (loading) return <h1>Fetching your orders</h1>;

    if (data.orders && data.orders.length) {
        console.log(`order list is ${JSON.stringify(data.orders)}`);
    }

    if (data.orders) {
        const { order } = data;
    return (
        <>
        <h1>previous orders...</h1>
        <Row>
            {data.orders.map((ord) => (
                <Col xs="6" sm="4" style={{ padding: 0 }} key={ord.id}>
                <Card style={{ margin: "0 10px" }}>
                    <CardBody>
                        <CardTitle>{ord.name}</CardTitle>
                        <CardText>{ord.amount}</CardText>
                    </CardBody>
                    <div className="card-footer">
                    <style jsx>
                    {`
                      a {
                        color: white;
                      }
                      a:link {
                        text-decoration: none;
                        color: white;
                      }
                      .container-fluid {
                        margin-bottom: 30px;
                      }
                      .btn-outline-primary {
                        color: #007bff !important;
                      }
                      a:hover {
                        color: white !important;
                      }
                    `}
                  </style>
                </div>
              </Card>
              <br></br>
              </Col>
             
            ))}
            </Row>
        </>
         );
    }

   
    return <h1>Add Orders</h1>;
}

export default pastOrders;