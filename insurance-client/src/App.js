import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import './App.scss';
import Insurance from './components/Insurance/insurance'
import Apptheme from "./theme";
import Footer from './components/Footer/footer'


function App() {
  return (
    <ThemeProvider theme={Apptheme}>
      <div className="App">
        <header className="pageContainer">
          <div className="d-flex width-100 height-100 page-Wrapper">
            <Insurance />
            <Footer />
          </div>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
