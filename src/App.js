import { Box } from '@chakra-ui/react';
import React from 'react';
import './App.css';
import FormEditPage from './Pages/FormEditPage';

import { useSelector } from 'react-redux';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';

function App() {

  const loggedUser = useSelector(state => state.utility.auth.data);

  return (

    <Box m={'10px auto 30px auto'} w='full'>
      <FormEditPage />
      {/* <FormEditPage /> */}
      {/* Login page disabled */}
      {/* {
        loggedUser && loggedUser.userId && loggedUser.accessToken
          ? <FormEditPage />
          : <Login />
      } */}
      {/* <SignUp /> */}
      {/* <Login /> */}
    </Box>
  );
}

export default App;
