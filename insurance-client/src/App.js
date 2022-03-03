import { Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import './App.scss';
import Insurance from './components/Insurance/insurance'
import Apptheme from "./theme";
import Footer from './components/Footer/footer';
import AddOrEditPolicy from './components/Insurance/Policy/policyAddOrEdit';
import Header from './components/Header/header';


function App() {
  return (
    <ThemeProvider theme={Apptheme}>
      <div className="App">
        <header className="pageContainer">
          <div className="d-flex width-100 height-100 page-Wrapper">
            <Header />
            <Route exact path="/">
              <Insurance />
            </Route>
            <Route exact path="/policy/:policyId/edit">
              <AddOrEditPolicy />
            </Route>
            <Footer />
          </div>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
