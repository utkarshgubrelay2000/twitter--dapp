import Layout from "../components/Layout";
import { useAppContext } from "../context/useProvider";

const Home = () => {
  
    const { provider,account,connect } = useAppContext();

  return (
    <Layout>
      <div>
   Hello App {account}
      </div>
    </Layout>
  );
};

export default Home;
