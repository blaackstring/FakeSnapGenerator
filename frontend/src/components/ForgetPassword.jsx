import React, { useEffect, useState } from 'react';
import Input from './Input';
import { forgetPass } from '../Controllers/AuthControllers';
import { toast } from 'react-toastify';

function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [endTime, setEndTime] = useState(0);
    const [remainingTime, setRemainingTime] = useState(0);

    useEffect(() => {
        if (isDisabled) {
            const interval = setInterval(() => {
                const timeLeft = Math.ceil((endTime - Date.now()) / 1000);
                setRemainingTime(timeLeft > 0 ? timeLeft : 0);
                if (timeLeft <= 0) {
                    setIsDisabled(false);
                    clearInterval(interval);
                }
            }, 1000);
            return () => clearInterval(interval); // Cleanup on unmount
        }
    }, [isDisabled, endTime]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!email) return toast.warning("Enter email", { autoClose: 2000 });

        setIsDisabled(true);
        const newEndTime = Date.now() + 15000; // 15 seconds from now
        setEndTime(newEndTime);
        setRemainingTime(15); // Start countdown from 15

        const res = await forgetPass(email);
        console.log(res);

        if (res.success) {
            toast.success(res.message, { autoClose: 3000 });
        } else {
            toast.warning(res.message, { autoClose: 2000 });
        }
    };

    return (
        <div className='w-full flex justify-center items-center flex-col bg-amber-400/70 h-[100vh]'>
            <h1 className='text-5xl font-bold mb-4'>Forget-Password</h1>
            <div className='h-[50%] w-1/3'>
                <form onSubmit={isDisabled ? undefined : submitHandler} className='w-full flex justify-center items-center flex-col p-2'>
                    <Input
                        className='rounded-xl p-1'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label={"Enter Your Email"}
                    />
                    <button
                        className="bg-blue-950 w-1/2 mt-3 h-10 rounded text-white hover:text-xl"
                        type="submit"
                        disabled={isDisabled}
                    >
                        {isDisabled ? `${remainingTime}s` : "Forget"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgetPassword;
