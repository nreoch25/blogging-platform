import { Fragment, useState } from "react";
import { Alert, Button, Form, FormGroup, Input } from "reactstrap";
import { signup } from "../../actions/auth";

const Signup = () => {
  const [values, setValues] = useState({
    name: "Nigel Reoch",
    email: "nreoch9@gmail.com",
    password: "abc123",
    error: "",
    loading: false,
    message: "",
    showForm: true
  });

  const { name, email, password, error, loading, message, showForm } = values;

  const handleSubmit = async evt => {
    evt.preventDefault();
    setValues({ ...values, loading: true, error: false });

    const data = await signup({ name, email, password });

    if (data.error) {
      return setValues({
        ...values,
        error: data.error,
        loading: false,
        message: ""
      });
    }

    setValues({
      ...values,
      name: "",
      email: "",
      password: "",
      error: "",
      loading: false,
      message: data.message,
      showForm: false
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
            type="text"
            value={name}
            placeholder="Type your name"
            onChange={handleChange("name")}
          />
        </FormGroup>
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
          Signup
        </Button>
      </Form>
    </Fragment>
  );
};

export default Signup;
