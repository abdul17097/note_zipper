import './App.css';
import Header from './component/Header/Header';
import { LandingPage } from './component/Screen/LandingPage/LandingPage';
import {Route, Routes} from 'react-router-dom'
import { Login } from './component/Screen/LoginPage/Login';
import { Register } from './component/Screen/RegisterPage/Register';
import { MyNotes } from './component/Screen/MyNotes/MyNotes';
import { CreateNote } from './component/Screen/CreateNotes/CreateNotes';
import { SingleNote } from './component/Screen/SingleNote/SingleNote';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Profile } from './component/Screen/Profile/Profile';


function App() {
  const [search, setSearch] = useState(" ")
  return (
    <div className="App">
    <ToastContainer/>

        <Header setSearch={setSearch}/>
          <Routes>
            <Route path='/' element={<LandingPage/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/createNotes' element={<CreateNote/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/mynote' element={<MyNotes  search= {search}/>} />
            <Route path={`/note/:id`} element={<SingleNote/>} />
            <Route path={`/profile`} element={<Profile/>} />
          </Routes>
    </div>
  );
}

export default App;
