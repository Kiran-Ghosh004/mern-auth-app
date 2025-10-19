import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import { notifyError, notifySuccess } from '../utils.js';

const Signup = () => {
    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [submitClicked, setSubmitClicked] = useState(false); // Track submit

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupData(prev => ({ ...prev, [name]: value }));
    };

    const handleSignup = (e) => {
        e.preventDefault();
        const { name, email, password } = signupData;

        if (name === "" || email === "" || password === "") {
            return notifyError("All fields are required");
        }

        setSubmitClicked(true); // Trigger useEffect
    };

    useEffect(() => {
        if (!submitClicked) return;

        const signupUser = async () => {
            try {
                const url = "http://localhost:8080/auth/signup";
                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(signupData)
                });

                const result = await res.json();

                if (res.ok) {
                    notifySuccess("Signup successful!");
                    // Redirect to login or clear form
                } else {
                    notifyError(result.message || "Signup failed");
                }

            } catch (err) {
                notifyError("Something went wrong");
            } finally {
                setSubmitClicked(false); // Reset
            }
        };

        signupUser();
    }, [submitClicked, signupData]); // Runs only when submitClicked becomes true

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
            <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Create Account</h2>
                <form className="space-y-6" onSubmit={handleSignup}>
                    {/* Name Field */}
                    <div className="relative">
                        <input
                            onChange={handleChange}
                            type="text"
                            placeholder=" "
                            name="name"
                            value={signupData.name}
                            className="peer w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition"
                        />
                        <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-sm">
                            Name
                        </label>
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                        <input
                            onChange={handleChange}
                            type="email"
                            placeholder=" "
                            name="email"
                            autoFocus
                            value={signupData.email}
                            className="peer w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition"
                        />
                        <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-sm">
                            Email
                        </label>
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <input
                            onChange={handleChange}
                            type="password"
                            placeholder=" "
                            name='password'
                            value={signupData.password}
                            className="peer w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition"
                        />
                        <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-sm">
                            Password
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
                    >
                        Sign Up
                    </button>

                    <div className="text-center mt-4 text-gray-500 text-sm">
                        <span>
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-blue-500 font-medium hover:underline hover:text-blue-600 transition"
                            >
                                Login
                            </Link>
                        </span>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Signup;
