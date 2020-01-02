import { Row, Col } from "reactstrap";
import Layout from "../components/Layout";
import Signup from "../components/auth/Signup";

const SignupPage = () => {
  return (
    <Layout>
      <h2 className="text-center pt-4 pb-4">Signup</h2>
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <Signup />
        </Col>
      </Row>
    </Layout>
  );
};

export default SignupPage;
