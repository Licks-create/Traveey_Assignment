import './App.css';
import Home from './pages/Home';
import Main from './components/Main';
import Question from './pages/Question';
import {BrowserRouter,Routes,Route, Outlet} from "react-router-dom"

function App() {
  
  return (
    <>

    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Main/>}>
          <Route index element={<Home/>}></Route>
          <Route path={"/questions"} element={<Question/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
