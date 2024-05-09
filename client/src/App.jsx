import { useContext, useEffect, useState } from 'react';
import "./App.css"
import { Context } from './main';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from './components/auth/login';
import Register from './components/auth/register';
import Home from './components/home/home';
import AllJobs from "./components/job/all.jobs";
import JobDetails from './components/job/job.details';
import Application from './components/application/application';
import MyApplication from './components/application/Myapplication';
import PostJobs from './components/job/postJobs';
import MyJobs from './components/job/myjobs';
import NotFound from './components/NotFound/notfound';
import Navbar from './components/layouts/navbar';
import Footer from './components/layouts/footer'
import axios from 'axios'

const App=()=>{
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(  // response includes data, statusCode, headers,etc
          import.meta.env.VITE_API_GET_USER,
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);



  return(
    <>
     <BrowserRouter>
     <Navbar/>
        <Routes>
        <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/job/getall" element={<AllJobs/>} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplication/>} />
          <Route path="/job/post" element={<PostJobs/>} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        <Footer/>
        <ToastContainer/>
        </BrowserRouter>
    </>
  )
}

export default App;;
