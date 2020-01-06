import { Fragment, useState, useEffect } from "react";
import Router from "next/router";
import { Alert, Button, Form, FormGroup, Input } from "reactstrap";
import { signin, authenticate, isAuth } from "../../actions/auth";

const Signin = () => {
  const [values, setValues] = useState({
    email: "nreoch9@gmail.com",
    password: "abc123",
    error: "",
    loading: false,
    message: "",
    showForm: true
  });

  useEffect(() => {
    // Redirect to index if user is authenticated
    if (isAuth()) {
      Router.push("/");
    }
  }, []);

  const { email, password, error, loading, message, showForm } = values;

  const handleSubmit = async evt => {
    evt.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const data = await signin({ email, password });
    if (data.error) {
      return setValues({
        ...values,
        error: data.error,
        loading: false,
        message: ""
      });
    }
    // save user token to cookie
    // save user info to localstorage
    // authenticate user
    authenticate(data, () => {
      Router.push(`/`);
    });
  };

  const handleChange = name => evt => {
    setValues({ ...values, error: false, [name]: evt.target.value });
  };

  return (
    <Fragment>
      {loading && <Alert color="info">Loading...</Alert>}
      {error && <Alert color="danger">{error}</Alert>}
      {message && <Alert color="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="email"
            value={email}
            placeholder="Type your email"
            onChange={handleChange("email")}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            value={password}
            placeholder="Type your password"
            onChange={handleChange("password")}
          />
        </FormGroup>
        <Button type="submit" color="primary" block>
          Signin
        </Button>
      </Form>
    </Fragment>
  );
};

export default Signin;
