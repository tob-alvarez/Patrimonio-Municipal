import { HashRouter, Routes, Route } from "react-router-dom";
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
import MediaCards from './components/MediaCard/MediaCardHome';
import Museo from "./components/TipoEstatua/Museos";
import Footer from "./common/Footer"

function App() {
  return (
    <>
      <HashRouter>
        <ProviderEducacion>
          <Layout>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/Esculturas" element={<Escultura />} />
              <Route exact path="/Estatuas" element={<Estatua />} />
              <Route exact path="/Bustos" element={<Busto />} />
              <Route exact path="/Sobrerelieves" element={<Sobrerelieve />} />
              <Route exact path="/Bajorelieves" element={<Bajorelieve />} />
              <Route exact path="/Pinturas" element={<Pintura />} />
              <Route exact path="/patrimonio/:id" element={<PatrimonioDetail />} />
              <Route exact path="/patrimonios" element={<MediaCards />} />
              <Route exact path="/Museos" element={<Museo />} />
              <Route exact path="/Footer" element={<Footer />} />
            </Routes>
          </Layout>
        </ProviderEducacion>
      </HashRouter>
    </>
  );
}

export default App;



