import { Routes, Route, HashRouter } from "react-router-dom";
import Layout from "./common/Layout";
import Home from "../src/components/Home/Home";
import ProviderEducacion from "./Context/EducaContext";

function App() {

  return (
    <>
      <HashRouter>
        <ProviderEducacion>
          <Layout>
            <Routes>
              <Route exact path="/*" element={<Home />} />
              <Route exact path="/home" element={<Home />} />
            </Routes>
          </Layout>
        </ProviderEducacion>
      </HashRouter>
    </>
  );
}

export default App;
