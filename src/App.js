import React, { Suspense } from 'react';
import { Routes, Route} from 'react-router-dom';
import './Assets/scss';
import Loading from './Components/Loading';
const delayLazy = new Promise(resolve => setTimeout(resolve, 1000));
const Notfound = React.lazy(() => { return delayLazy.then(() => import('./Components/NotFound'))});
const Home = React.lazy(() => { return delayLazy.then(() => import('./Pages/Home'))});
const Signup = React.lazy(() => { return delayLazy.then(() => import('./Pages/Signup'))});
const CheckCode =  React.lazy(() => { return delayLazy.then(() => import('./Pages/CheckCode'))});
const Winner = React.lazy(() => { return delayLazy.then(() => import('./Pages/Winner'))});
const Loser =  React.lazy(() => { return delayLazy.then(() => import('./Pages/Loser'))});

function App() {
  return (
    <>
      <Suspense fallback={<Loading/>}>
        <Routes>
          <Route exact path={`${process.env.REACT_APP_BASE_URL}/`} element={<Home/>} />
          <Route path={`${process.env.REACT_APP_BASE_URL}/signup`} element={<Signup/>} />
          <Route path={`${process.env.REACT_APP_BASE_URL}/code/:userId`} element={<CheckCode/>} />
          <Route path={`${process.env.REACT_APP_BASE_URL}/winner`} element={<Winner/>} />
          <Route path={`${process.env.REACT_APP_BASE_URL}/goodtry`} element={<Loser/>} />
          <Route path={`${process.env.REACT_APP_BASE_URL}/*`} element={<Notfound/>} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
