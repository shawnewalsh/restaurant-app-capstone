/* components/RestaurantList/index.js */
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Link from "next/link";

import {
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    Row,
    Col,
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





  function OrderList(props) {
    console.log(`props user query is ${props.search}`);
    const { loading, error, data } = useQuery(QUERY);
    if (error) return "no orders found";

    if (loading) return <h1>Loading your order list...</h1>;

    if (data.orders && data.orders.length) {
        console.log(`Here is your order ${JSON.stringify(data.orders)}`);
    }
    const userOrders = data.orders.filter(order => {
      return order.user.username.includes(props.search);
    })

    console.log(`user orders is ${JSON.stringify(userOrders)}`)
    return (
      <><h1>hello there {props.search}</h1><Row>
        {userOrders.map((ord) => (
          <Col xs="6" sm="4" style={{ padding: 0 }} key={ord.id}>
            <Card style={{ margin: "0 10px" }}>
              <CardBody>
                <CardTitle>{ord.createdAt}</CardTitle>
                <CardText>{ord.user.username}</CardText>

                <CardText>{ord.dishes[0].name}</CardText>
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
                </style>${(ord.amount / 100).toPrecision(4)}
              </div>
            </Card>
            <br></br>
          </Col>

        ))}
      </Row></>

      
    )

  }

  export default OrderList;