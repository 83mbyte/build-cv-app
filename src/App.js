import './App.css';
import Welcome from './pages/Welcome';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, } from 'react-router-dom';
import Login from './pages/Login';

import React from 'react';
import Layout from './components/Layouts/Layout';
import SignUp from './pages/SignUp';
import ErrorPage from './pages/ErrorPage';
import ProtectedWrapper from './components/Wrappers/ProtectedWrapper';

import Dashboard from './pages/Dashboard';
import Preview from './pages/Preview';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>

      <Route path='/' element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<Welcome />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
      </Route>
      <Route path='dashboard' element={<ProtectedWrapper />}  >
        <Route index element={<Dashboard />} />
        <Route path='preview' element={<Preview />} />
      </Route>

    </>

  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
