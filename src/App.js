import React, { useState } from 'react';
import {

  Box,

  Progress,
  Center,
} from '@chakra-ui/react';
import './App.css';


function App() {
  const [globalState, setGlobalState] = useState(null);

  return (

    <>
      {
        globalState ? <p>loaded</p> :
          <Center h={'300px'} >
            <Box bg='blue' w={['200px', 'md', 'lg', '2xl']}><Progress isIndeterminate size='xs' /></Box>
          </Center>

      }
    </>




  );
}

export default App;
