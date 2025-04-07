import { useEffect, useState } from "react";
import Input from "./Input";
import loginImg from '../assets/login.png'
import { Link, Navigate, useNavigate } from "react-router-dom";
import { LoginController } from "../Controllers/AuthControllers";
import { useDispatch, useSelector } from "react-redux";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spin from "./ui/Spin";
import { UserInfo } from "../store/userdetails.js";



function Login() {
    const dispatch = useDispatch()
    // const selector=useSelector((state)=>state.user) //state is the whole redux store and state.user → The user slice(jo tumne slice banai hai) from the store (because in store.js, you named it user).

    const navigate = useNavigate()
    const [isLoading, setisLoading] = useState(false)
    const [formdata, setFormData] = useState({
        email: '',
        password: '',
    });
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (formdata.email != '' && formdata.password != '') {
                setisLoading(true)
                console.log(formdata);
                const fetchData = await LoginController(formdata);
                if (fetchData.success === true) {
                    const { message, user } = fetchData;
                    dispatch(UserInfo({ ...user }))
                    setisLoading(false)
                    navigate('/userhome', {
                        replace: true,
                        state: true
                    })
                    toast.success('🦄 Login SuccessFull!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    });

                }
                else {
                    toast.error("Invalid Credentials",{ autoClose: 3000,})
                }
                setisLoading(false)

            } else {
                toast.warning("Forget to 😅😅 Enter Email or Password ",{ autoClose: 3000})
            }

        } catch (error) {
            toast.warn("Invalid Credentials",{ autoClose: 3000,})
            console.log(error);
        }


    }


    const handleinputchange = (e) => {
        setFormData({ ...formdata, [e.target.name]: e.target.value });

    }

    return (
        <div className="lg:w-[40vw] sm:w-[90vw] flex-col  lg:h-[70vh] md:w-[70%] md:h-[60%] h-[55vh] w-[95vw] p-2 flex items-center justify-center backdrop:blur-3xl   bg-white/20 rounded-2xl">
            <div className="   bg-white/40 p-3 lg:w-[30vw] w-[95%] rounded-lg shadow-lg lg:h-[75%]  flex flex-col items-center justify-around">
                <img src={loginImg} alt="" className='w-[100px] h-[100px] ' />
                <form action="" onSubmit={handleSubmit} className="flex items-center flex-col w-full">

                    <Input onChange={handleinputchange} classname="w-full p-2 border-2 rounded-2xl bg-white" placeholder="Email" value={formdata.email} name="email" label="Email" />
                    <Input onChange={handleinputchange} classname="w-full p-2 border-2 rounded-2xl bg-white" placeholder="Password" name="password" type="password" label="Password"  value={formdata.password}/>
                    <Link to={"/forgetPassword"}  className=" bg-blue-950 w-fit p-2 rounded-2xl text-white">Forget-Password</Link>
                    <button className="bg-black w-1/2 mt-3 h-10 rounded text-white hover:text-2xl" type="submit">Login</button>
                </form>
      
            </div>
            <div className={`bg absolute  z-30 ${isLoading ? 'block' : 'hidden'}`}>
                <Spin />
            </div>
            
            <div className="mt-3">
        <span>Make sure login with Authorised Gmail Id being able to Forget Password</span>

            </div>
        </div>
    );
}

export default Login;
