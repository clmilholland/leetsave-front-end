
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Root } from './Root';
import { Home } from '../pages/home/Home';
import { Welcome } from '../pages/welcome/Welcome';
import { Login } from '../pages/login/Login';
import { Register } from '../pages/register/Register';
import { ProblemCard } from '../pages/problemcard/ProblemCard';
import { Problems } from '../pages/problems/Problems';
import { Favorites } from '../pages/favorites/Favorites';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root/>}>
    <Route index element={<Home/>} />
    <Route path='/welcome' element={<Welcome/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/problems' element={<Problems/>} />
    <Route path='/problems/:problemId' element={<ProblemCard/>} />
    <Route path='/problems/favorites' element={<Favorites/>} />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
