import React, { Component } from "react";
import {
  Header,
  Button,
  Form,
  Input,
  Icon,
  Card,
  Container,
  Grid,
} from "semantic-ui-react";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import * as Yup from "yup";
import "./Signup.css";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

class Signup extends Component {
  state = {
    buttonDisabled: false,
    isSignup: true,
    email: "",
    password: "",
  };

  submitHandler = (values) => {
    this.props.onAuth(values.email, values.password, this.state.isSignup);
  };
  render() {
    const schema = Yup.object().shape({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email().required("Email is required"),
      password: Yup.string().required("Password is required"),
    });
    return (
      <Grid className="SignupGrid">
        <Grid.Column width={8} className="SignupColumn">
          <Container text>
            <Card className="SignupWelcomeText">
              <Card.Content>
                <Card.Header
                  style={{ fontSize: "35px", color: "antiquewhite" }}
                >
                  Welcome to WikiMovies
                </Card.Header>
                <Card.Description
                  style={{ fontSize: "25px", color: "antiquewhite" }}
                >
                  <p>
                    Your new favourite way to navigate movies, tv series and
                    people
                  </p>
                </Card.Description>
              </Card.Content>
            </Card>
          </Container>
        </Grid.Column>
        <Grid.Column width={8} className="SignupColumn">
          <Container text>
            <Card className="SignupCard">
              <Card.Content>
                <Card.Header className="SignupHeader">Sign Up</Card.Header>
                <Card.Description>
                  <Header className="BecomeOneOfUs">Become one of us!</Header>
                  <Formik
                    validationSchema={schema}
                    onSubmit={(values) => this.submitHandler(values)}
                    initialValues={{
                      name: "",
                      email: "",
                      password: "",
                    }}
                    render={({
                      handleSubmit,
                      handleChange,
                      values,
                      touched,
                      isInvalid,
                      handleBlur,
                      errors,
                    }) => (
                      <Form
                        onSubmit={(event) => {
                          handleSubmit(values);
                        }}
                      >
                        <Form.Field>
                          <div className="SignupIconInput">
                            <Icon
                              style={{ lineHeight: "1.5", color: "white" }}
                              size="big"
                              disabled
                              name="user"
                            />
                            <Input
                              className="SignupInput"
                              placeholder="Name"
                              name="name"
                              value={values.name}
                              onChange={handleChange}
                              isInvalid={!!errors.name && !!touched.name}
                              type="name"
                              onBlur={handleBlur}
                            />
                          </div>
                          {errors.name && touched.name ? (
                            <label className="SignupError">{errors.name}</label>
                          ) : null}
                        </Form.Field>
                        <Form.Field>
                          <div className="SignupIconInput">
                            <Icon
                              style={{ lineHeight: "1.5", color: "white" }}
                              size="big"
                              disabled
                              name="mail"
                            />
                            <Input
                              className="SignupInput"
                              placeholder="Email"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              isInvalid={!!errors.email && !!touched.email}
                              type="email"
                              onBlur={handleBlur}
                            />
                          </div>
                          {errors.email && touched.email ? (
                            <label className="SignupError">
                              {errors.email}
                            </label>
                          ) : null}
                        </Form.Field>
                        <Form.Field>
                          <div className="SignupIconInput">
                            <Icon
                              style={{ lineHeight: "1.5", color: "white" }}
                              size="big"
                              disabled
                              name="key"
                            />
                            <Input
                              className="SignupInput"
                              type="password"
                              placeholder="Password"
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                              isInvalid={
                                !!touched.password && !!errors.password
                              }
                              onBlur={handleBlur}
                            />
                          </div>
                          {errors.password && touched.password ? (
                            <label className="SignupError">
                              {errors.password}
                            </label>
                          ) : null}
                        </Form.Field>
                        <div className="SignupButtonDiv">
                          <Button
                            className="SignupButton"
                            type="submit"
                            disabled={this.state.buttonDisabled}
                          >
                            Sign Up
                          </Button>
                        </div>
                      </Form>
                    )}
                  />
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="SignupFooter">
                  <footer style={{ color: "white" }}>
                    Got an account?{" "}
                    <a style={{ color: "#3a529c" }} href="/signin">
                      Sign In!
                    </a>
                  </footer>
                </div>
              </Card.Content>
            </Card>
          </Container>
        </Grid.Column>
      </Grid>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
  };
};
export default connect(null, mapDispatchToProps)(withRouter(Signup));
