/* /pages/register.js */

import React, { useState, useContext } from "react";
import { ToastProvider, useToasts } from 'react-toast-notifications';

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { registerUser } from "../lib/auth";
import AppContext from "../context/AppContext";


const Register = () => {
  const [data, setData] = useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const appContext = useContext(AppContext);
  const { addToast } = useToasts();

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 5, offset: 3 }}>
          <div className="paper">
          <div className="header">
              Frisco Eats....
            </div>
            <section className="wrapper">
              {Object.entries(error).length !== 0 &&
                error.constructor === Object &&
                error.message.map((error) => {
                  return (
                    <div
                      key={error.messages[0].id}
                      style={{ marginBottom: 10 }}
                    >
                      <small style={{ color: "red" }}>
                        {error.messages[0].message}
                      </small>
                    </div>
                  );
                })}
              <Form>
                <fieldset disabled={loading}>
                  <FormGroup>
                    <Label>Username:</Label>
                    <Input
                      disabled={loading}
                      onChange={(e) =>
                        setData({ ...data, username: e.target.value })
                      }
                      value={data.username}
                      type="text"
                      name="username"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Email:</Label>
                    <Input
                      onChange={(e) => {
                        
                        setData({ ...data, email: e.target.value })
                      }}

                      value={data.email}
                      type="email"
                      name="email"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label>Password:</Label>
                    <Input
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                      value={data.password}
                      type="password"
                      name="password"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <span>
                      <a href="">
                        <small>Forgot Password?</small>
                      </a>
                    </span>
                    <Button
                      style={{ float: "right", width: 120 }}
                      color="primary"
                      disabled={loading}
                      onClick={() => {
                        setLoading(true);
                        registerUser(data.username, data.email, data.password)
                          .then((res) => {
                            // set authed user in global context object
                            appContext.setUser(res.data.user);
                            setLoading(false);
                            addToast('Registered Successfully', { appearance: 'success' });
                          })
                          .catch((error) => {
                            setError(error.response.data);
                            setLoading(false);
                          });
                      }}
                    >
                      {loading ? "Loading.." : "Submit"}
                    </Button>
                  </FormGroup>
                </fieldset>
              </Form>
            </section>
          </div>
        </Col>
      </Row>
      <style jsx>
        {`
          .paper {
            border: 1px solid lightgray;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
              0px 2px 1px -1px rgba(0, 0, 0, 0.12);
            border-radius: 6px;
            margin-top: 90px;
          }
          .notification {
            color: #ab003c;
          }
          .header {
            width: 100%;
            height: 120px;
            background-color: #2196f3;
            margin-bottom: 30px;
            border-radius-top: 6px;
            @import url('https://fonts.googleapis.com/css2?family=Rubik+Bubbles&family=Space+Mono:ital@0;1&display=swap');
            font-family: 'Rubik Bubbles', cursive;
            font-size: 50px;
            color: white;
            text-align: center;
            padding: 20px 20px;
          }
          .wrapper {
            padding: 10px 30px 20px 30px !important;
          }
          a {
            color: blue !important;
          }
          img {
            margin: 15px 30px 10px 50px;
          }
        `}
      </style>
    </Container>
  );
};
export default Register;