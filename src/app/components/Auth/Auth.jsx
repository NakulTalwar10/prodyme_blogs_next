"use client"
import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GrFormViewHide } from "react-icons/gr"
import { FaRegEye } from "react-icons/fa6";
import url from '../../../url'

const Auth = ({updateUser}) => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({
        fullname: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${url.apiUrl}/auth/register`, { ...user });
            setIsLogin(true);
            setUser({ fullname: "", email: "", password: "" });
            toast.success("Signup successful. Please log in.");
        } catch (err) {
            // console.log(err);
            toast.error(err.message);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${url.apiUrl}/auth/login`, { ...user });
            const { token } = response.data;

            if (!token) {
                toast.error("Invalid Email or Password");
            } else {
                localStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                toast.success("Login successful");
                updateUser(response.data);
            }
            setUser({ email: "", password: "" });
        } catch (err) {
            toast.error("Invalid Email or Password");
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="">
            <ToastContainer/>
            <div className="w-80 h-96 bg-white rounded-lg p-5 shadow-lg">
                <p className="text-center font-bold my-4 text-2xl">Welcome {isLogin ? "Back" : "New User"}</p>
                {isLogin ? (
                    <form className="w-full flex flex-col gap-4 mb-6" onSubmit={handleLogin}>
                    
                        <input type="email" className="rounded-full border border-gray-300 outline-none px-4 py-3" placeholder="Email" name="email" value={user.email} onChange={handleChange} />

                        <div className="relative">

                            <input type={showPassword ? "text" : "password"} className="rounded-full border border-gray-300 outline-none px-4 py-3 lg:pr-20" placeholder="Password" name="password" value={user.password} onChange={handleChange} />
                            <button type="button" className="absolute top-4 right-5 pr-5 lg:pr-0 text-lg" onClick={togglePasswordVisibility}>
                                {showPassword ?<FaRegEye/>  :  <GrFormViewHide/>}
                            </button>
                        </div>
                        <p className="text-right text-sm text-gray-600 underline">
                            <span className="cursor-pointer text-xs font-bold">Forgot Password?</span>
                        </p>
                        <button className="px-6 py-3 rounded-full bg-orange-500 text-white font-bold shadow-md">Log in</button>
                    </form>
                ) : (
                    <form className="w-full flex flex-col gap-4 mb-6" onSubmit={handleSignup}>
                        <input type="text" className="rounded-full border border-gray-300 outline-none px-4 py-3" placeholder="Full Name" name="fullname" value={user.fullname} onChange={handleChange} />
                        <input type="email" className="rounded-full border border-gray-300 outline-none px-4 py-3" placeholder="Email" name="email" value={user.email} onChange={handleChange} />
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} className="rounded-full border border-gray-300 outline-none px-4 py-3 lg:pr-20" placeholder="Password" name="password" value={user.password} onChange={handleChange} />
                            <button type="button" className="absolute top-4 right-5 pr-5 lg:pr-0 text-lg" onClick={togglePasswordVisibility}>
                                {showPassword ? <FaRegEye/> :<GrFormViewHide/> }
                            </button>
                        </div>
                        <button className="px-6 py-3 rounded-full bg-orange-500 text-white font-bold shadow-md">Sign up</button>
                    </form>
                )}
                <p className="text-sm text-gray-600" onClick={toggleForm}>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}<span className="ml-1 text-sm font-bold text-orange-400 cursor-pointer my-5">{isLogin ? "Sign up" : "Log in"}</span>
                </p>
            </div>
        </div>
    );
};

export default Auth;
