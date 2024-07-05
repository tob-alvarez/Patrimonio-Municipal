import NavBar from "./NavBar";
import Footer from "./Footer";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {

  return (
    <>
      <NavBar />
      {children}
      <Footer />

    </>

  );
};

export default Layout;
