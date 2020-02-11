import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { store } from './util/store';
import { App } from './App/App';
import './index.css'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#54AAB3',
            dark: '#3c8f98',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#ffffff',
            contrastText: '#000000'
        }
    }
});

render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);