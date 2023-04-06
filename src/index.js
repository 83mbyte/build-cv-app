import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme, Box } from '@chakra-ui/react';
import App from './App';
import reportWebVitals from './reportWebVitals';


import { Provider } from 'react-redux';
import store from './redux/store';


const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
};

const theme = extendTheme({
  styles: {
    global: {
      ".mainBg": {
        //backgroundImage: 'url("./bg_1.jpg")',

        backgroundImage: 'url("./bg.svg")',
        backgroundSize: 'contain',
        minHeight: '100vh',
        height: '100%'
      }
    },

  },

  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              }
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label": {
              ...activeLabelStyles
            },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "white",
              pointerEvents: "none",
              color: 'gray.500',
              mx: 3,
              px: [1, 2],
              my: [1, 2],
              transformOrigin: "left top"
            }
          }
        }
      }
    }
  }
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <Box className='mainBg'>
        <App />
      </Box>
    </Provider>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
