
import React, { useState } from 'react'
import Input from './Input';
import { toast } from 'react-toastify';
import { passReset } from '../Controllers/AuthControllers';
import { useParams } from 'react-router-dom';

const ResetPassword=()=>{
    const {token}=useParams();
    const [data,setData]=useState({
        password:'',
        ConfirmPassword:''
    })


    const submitHandler=async(e)=>{
        e.preventDefault();
            if(data.password!==data.ConfirmPassword){
                console.log(data.ConfirmPassword,data.password);
                
                toast.warning("Password not matched",{autoClose: 2000})
                return setData({
                    password:'',
                    ConfirmPassword:''
                })
            }

            const res= await 
            passReset(data.password,token)
console.log(res);

            if(res.success){
              return  toast.success(res.message,{autoClose: 3000})
            }

            toast.warning(res.message,{autoClose: 2000});


    }
    return <div className='w-full h-full flex  flex-col justify-center items-center'>
        

        <h1 className='font-bold text-[5vw]'>
            Reset Password
        </h1>
<div  className='w-full h-full flex justify-center items-center'>
        <form action="" className='w-1/3 min-w-[250px] h-[30vh]  border-1 rounded border-black/50 p-2' onSubmit={submitHandler}>

        
           
    <Input label={"Enter New Password"} name={"password"} value={data.password} onChange={(e)=>setData((prev)=>({...prev,[e.target.name]:e.target.value}))}/>
    <Input label={"Enter Confirm Password"} name={"ConfirmPassword"} value={data.ConfirmPassword} onChange={(e)=>setData((prev)=>({...prev,[e.target.name]:e.target.value}))}/>
    <button className="bg-blue-950 w-1/2 mt-3 h-10 rounded text-white hover:text-xl" type="submit">Reset</button>
        </form>

    </div>

    </div>
}

export default ResetPassword;