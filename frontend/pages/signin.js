import { Row, Col } from "reactstrap";
import Layout from "../components/Layout";
import Signin from "../components/auth/Signin";

const SigninPage = () => {
  return (
    <Layout>
      <h2 className="text-center pt-4 pb-4">Signup</h2>
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <Signin />
        </Col>
      </Row>
    </Layout>
  );
};

export default SigninPage;
