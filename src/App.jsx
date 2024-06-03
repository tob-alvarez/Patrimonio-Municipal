import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./common/Layout";
import Home from "../src/components/Home/Home";
import ProviderEducacion from "./Context/EducaContext";
import Escultura from './components/TipoEstatua/Esculturas';
import Estatua from './components/TipoEstatua/Estatuas';
import Busto from './components/TipoEstatua/Bustos';
import Sobrerelieve from './components/TipoEstatua/Sobrerelieves';
import Bajorelieve from './components/TipoEstatua/Bajorelieves';
import Pintura from './components/TipoEstatua/Pinturas';
import PatrimonioDetail from './components/PatrimonioDetail/PatrimonioDetails'; 

function App() {
  return (
    <>
      <Router>
        <ProviderEducacion>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/Esculturas" element={<Escultura />} />
              <Route path="/Estatuas" element={<Estatua />} />
              <Route path="/Bustos" element={<Busto />} />
              <Route path="/Sobrerelieves" element={<Sobrerelieve />} />
              <Route path="/Bajorelieves" element={<Bajorelieve />} />
              <Route path="/Pinturas" element={<Pintura />} />
              <Route path="/patrimonio/listarPatrimonioPorId/:id" element={<PatrimonioDetail />} />
            </Routes>
          </Layout>
        </ProviderEducacion>
      </Router>
    </>
  );
}

export default App;

