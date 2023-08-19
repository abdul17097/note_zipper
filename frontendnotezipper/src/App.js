import './App.css';
import Header from './component/Header/Header';
import { LandingPage } from './component/Screen/LandingPage/LandingPage';
import {Route, Routes} from 'react-router-dom'
import { Login } from './component/Screen/LoginPage/Login';
import { Register } from './component/Screen/RegisterPage/Register';
import { MyNotes } from './component/Screen/MyNotes/MyNotes';
import { CreateNote } from './component/Screen/CreateNotes/CreateNotes';
// import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="App">
        <Header/>
          <Routes>
            <Route path='/' element={<LandingPage/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/createNotes' element={<CreateNote/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/mynote' element={<MyNotes/>} />
          </Routes>
    </div>
  );
}

export default App;
