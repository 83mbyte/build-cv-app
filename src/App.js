
import React from 'react';

import { useSelector } from 'react-redux';
import SpinnerCustom from './components/Spinner/SpinnerCustom';
import Dashboard from './Pages/Dashboard';

function App() {

  const loggedUser = useSelector(state => state.utility.auth.data);

  return (

    <>
      {
        loggedUser ?
          <>
            <Dashboard />
          </>
          : <SpinnerCustom />
      }
    </>
  );
}

export default App;
