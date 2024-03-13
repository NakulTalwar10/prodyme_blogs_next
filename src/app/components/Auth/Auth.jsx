"use client"
import axios from "axios";
import React, { useState } from "react";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [user, setUser] = useState({
        fullname: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleSignup = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:5000/auth/register', { ...user })
            setIsLogin(true);
            setUser({ fullname: "", email: "", password: "" });
            alert("Signup successful. Please log in.");
        } catch (err) {
            console.log(err);
            alert(err.message)
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:5000/auth/login', { ...user })
            const { token } = response.data
            console.log(response);

            if (!token) {
                alert("Invalid Email or Password")
            } else {
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            }
            setUser({ email: "", password: "" });
        } catch (err) {
            alert("invalid Email or Password")
        }
    }

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };
    return (
        <div className="">
            <div className="w-80 h-96 bg-white rounded-lg p-5 shadow-lg">
                <p className="text-center font-bold my-4 text-2xl">Welcome {isLogin ? "Back" : "New User"}</p>
                {isLogin ? (
                    <form className="w-full flex flex-col gap-4 mb-6" onSubmit={handleLogin}>
                        <input type="email" className="rounded-full border border-gray-300 outline-none px-4 py-3" placeholder="Email" name="email" value={user.email} onChange={handleChange} />
                        <input type="password" className="rounded-full border border-gray-300 outline-none px-4 py-3" placeholder="Password" name="password" value={user.password} onChange={handleChange} />
                        <p className="text-right text-sm text-gray-600 underline">
                            <span className="cursor-pointer text-xs font-bold">Forgot Password?</span>
                        </p>
                        <button className="px-6 py-3 rounded-full bg-orange-500 text-white font-bold shadow-md" onClick={handleLogin}>Log in</button>
                    </form>
                ) : (
                    <form className="w-full flex flex-col gap-4 mb-6" onSubmit={handleSignup}>
                        <input type="text" className="rounded-full border border-gray-300 outline-none px-4 py-3" placeholder="Full Name" name="fullname" value={user.fullname} onChange={handleChange} />
                        <input type="email" className="rounded-full border border-gray-300 outline-none px-4 py-3" placeholder="Email" name="email" value={user.email} onChange={handleChange} />
                        <input type="password" className="rounded-full border border-gray-300 outline-none px-4 py-3" placeholder="Password" name="password" value={user.password} onChange={handleChange} />
                        <button className="px-6 py-3 rounded-full bg-orange-500 text-white font-bold shadow-md" onClick={handleSignup}>Sign up</button>
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
