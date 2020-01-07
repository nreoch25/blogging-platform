import Layout from "../../components/Layout";
import Private from "../../components/auth/Private";

const UserIndexPage = () => {
  return (
    <Layout>
      <Private>
        <h2>UserIndexPage</h2>
      </Private>
    </Layout>
  );
};

export default UserIndexPage;
