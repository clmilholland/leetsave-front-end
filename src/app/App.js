
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Root } from './Root';
import { Home } from '../pages/home/Home';
import { Welcome } from '../pages/welcome/Welcome';
import { Login } from '../pages/login/Login';
import { Register } from '../pages/register/Register';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root/>}>
    <Route index element={<Home/>} />
    <Route path='/welcome' element={<Welcome/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>} />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
