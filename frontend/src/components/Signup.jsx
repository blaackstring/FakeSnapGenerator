import {  useState } from "react";
import Input from "./Input";
import addImg from '../assets/add.png'
import { SignupController } from "../Controllers/AuthControllers";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signup=()=>{
  const navigate=useNavigate()
    const [formdata,setformdata]=useState({
        email:"",
        password:"",
        gender:'',
        username:'',
    })
const handleinputchange=(e)=>{
    setformdata({...formdata,[e.target.name]:e.target.value})
} 
const handleSubmit = async (e) => {
  try {
    e.preventDefault();
    console.log(formdata);
    const fetchData = await SignupController(formdata); // Call API
    console.log(fetchData);

    if (fetchData.sucess) {  // FIX: Use fetchData.success instead of formdata.success
      navigate("/login");
      toast.success('🦄 Signup Successful!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      setformdata({   // Reset form after success
        email: "",
        password: "",
        fullname: "",
        gender: "",
        username: "",
      });
    } else {
      toast.error(fetchData.message || "Signup Failed!", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  } catch (error) {
    console.log(error);
    toast.error("Something Went Wrong!", { theme: "dark" });
  }
};

    return <>
     <div className="lg:w-[38vw] sm:w-[55vw] p-2 mb-10 flex flex-col items-center justify-center backdrop:blur-3xl mt-10  bg-white/20 rounded-2xl">
        <div className=" w-90 bg-white/40 p-3 rounded-lg shadow-lg h-full flex flex-col items-center justify-around">
                 <img src={addImg} alt="" className='w-[90px] h-[90px] '/>
          <form action="" onSubmit={handleSubmit} className=" flex items-center flex-col justify-center">

          <Input   onChange={handleinputchange} value={formdata.email} classname="w-full p-2 border-2 rounded-2xl bg-white" placeholder="Email" name="email" label="Email" />
            <Input   onChange={handleinputchange} classname="w-full p-2 border-2 rounded-2xl bg-white" value={formdata.password} placeholder="Password" name="password"  label="Password"/>
            
          <Input   onChange={handleinputchange} classname="w-full p-2 border-2 rounded-2xl bg-white" value={formdata.username} placeholder="username" name="username" label="username" />
           <label htmlFor="" className="w-full ml-2 font-bold">Gender:</label>
       <div className="flex flex-row w-60 h-10 pl-4 rounded-xl justify-between items-center  bg-white ">
  <label htmlFor="" className="font-bold"> male</label>

       <Input type="radio" onChange={handleinputchange} value="male" name="gender"  />
  <label htmlFor="" className="font-bold"> female</label>
       <Input type="radio"  onChange={handleinputchange} value='female'name="gender" />
       </div> 
       <button className="bg-black w-1/2 mt-3  h-10 rounded text-white hover:text-2xl" type="submit">Signup</button>

     
          </form>
          {/* Your Login Form */}
        </div>
        <div className="mt-3">
        <span>Make sure Signup with Authorised Gmail Id being able to Forget Password</span>

            </div>
      </div>
    </>
    }

export default Signup;
