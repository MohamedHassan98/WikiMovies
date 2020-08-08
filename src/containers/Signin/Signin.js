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
import { connect } from "react-redux";
import "./Signin.css";
import * as actions from "../store/actions/index";

class Signin extends Component {
  state = {
    buttonDisabled: false,
    isSignup: false,
    email: "",
    password: "",
  };

  submitHandler = (values) => {
    this.props.onAuth(values.email, values.password, this.state.isSignup);
  };

  render() {
    const { buttonDisabled } = this.state;
    const schema = Yup.object().shape({
      email: Yup.string().email().required("Email is required"),
      password: Yup.string().required("Password is required"),
    });
    return (
      <Grid className="SigninGrid">
        <Grid.Column width={8} className="SigninColumn">
          <Container text>
            <Card className="SigninCard">
              <Card.Content>
                <Card.Header className="SigninHeader">Sign In</Card.Header>
                <Card.Description>
                  <Header className="WelcomeBack">Welcome Back!</Header>
                  <Formik
                    validationSchema={schema}
                    onSubmit={(values) => this.submitHandler(values)}
                    initialValues={{
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
                          <div className="SigninIconInput">
                            <Icon
                              className="SignInIcon"
                              size="big"
                              disabled
                              name="mail"
                            />
                            <Input
                              className="SigninInput"
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
                            <label className="SigninError">
                              {errors.email}
                            </label>
                          ) : null}
                        </Form.Field>
                        <Form.Field>
                          <div className="SigninIconInput">
                            <Icon
                              className="SignInIcon"
                              size="big"
                              disabled
                              name="key"
                            />
                            <Input
                              className="SigninInput"
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
                            <label className="SigninError">
                              {errors.password}
                            </label>
                          ) : null}
                        </Form.Field>
                        <div className="SigninButtonDiv">
                          <Button
                            className="SigninButton"
                            type="submit"
                            disabled={buttonDisabled}
                          >
                            Sign In
                          </Button>
                        </div>
                      </Form>
                    )}
                  />
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="SigninFooter">
                  <footer>
                    New member?{" "}
                    <a className="SigninHrefSignup" href="/signup">
                      Sign Up!
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
export default connect(null, mapDispatchToProps)(withRouter(Signin));
