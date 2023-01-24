import React, { useEffect, useState } from 'react';
import {
  Box,
  Progress,
  Center,
} from '@chakra-ui/react';

import './App.css';

import { fetchAPI } from './API/api';
import FormEditPage from './Pages/FormEditPage';

function App() {
  const [globalState, setGlobalState] = useState(null);

  const getDataToState = async () => {
    let data = await fetchAPI.simpleFetchData('user_1');
    if (data && data !== 'Error -- simpleFetchData from api.js') {
      setGlobalState(data);
    }
  }
  useEffect(() => { getDataToState() }, []);

  return (

    <>
      {
        globalState
          ? <FormEditPage state={globalState} />
          :
          <Center h={'300px'} >
            <Box bg='blue' w={['200px', 'md', 'lg', '2xl']}><Progress isIndeterminate size='xs' /></Box>
          </Center>
      }
    </>

  );
}

export default App;
