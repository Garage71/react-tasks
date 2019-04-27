import MomentUtils from '@date-io/moment';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { blue, grey }  from '@material-ui/core/colors';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AppNavBar from './components/navigation/AppNavBar';
import store from './redux-infrastucture/store';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: grey
  }
})

class App extends React.Component {
  public render() {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Provider store={store}>
          <Router>
            <MuiThemeProvider theme={theme}>
              <AppNavBar />
            </MuiThemeProvider>
          </Router>
        </Provider>
      </MuiPickersUtilsProvider>
    );
  }
}


export default App;
