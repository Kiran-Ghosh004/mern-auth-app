import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { notifyError, notifySuccess } from '../utils.js';

const Login = () => {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginData;

        if (!email || !password) return notifyError("All fields are required");

        try {
            const res = await fetch("https://authapi-ej6oyijkm-kiran-ghoshs-projects.vercel.app/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData)
            });

            const result = await res.json();

            if (res.ok) {
                const { token, name } = result; // destructure here
                notifySuccess("Login successful!");
                localStorage.setItem("token", token); // store token
                localStorage.setItem("loggedInUser", name); // store user name
                setLoginData({ email: "", password: "" });
                setTimeout(() => navigate("/home"), 1500);
            } else {
                notifyError(result.message || "Login failed");
            }
        } catch (err) {
            notifyError("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900">
            <div className="w-full max-w-md bg-neutral-900 p-10 rounded-2xl shadow-lg border border-gray-700">
                <h2 className="text-3xl font-semibold text-white text-center mb-8">
                    Login to your Account
                </h2>

                <form className="space-y-6" onSubmit={handleLogin}>
                    <div className="flex flex-col">
                        <label className="text-gray-300 mb-1 text-sm">Email</label>
                        <input
                            onChange={handleChange}
                            type="email"
                            name="email"
                            value={loginData.email}
                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-300 mb-1 text-sm">Password</label>
                        <input
                            onChange={handleChange}
                            type="password"
                            name="password"
                            value={loginData.password}
                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
                    >
                        Login
                    </button>

                    <div className="text-center mt-4 text-gray-400 text-sm">
                        <span>
                            Don't have an account?{' '}
                            <Link
                                to="/signup"
                                className="text-blue-400 font-medium hover:underline"
                            >
                                Signup
                            </Link>
                        </span>
                    </div>
                </form>

                <ToastContainer />
            </div>
        </div>
    );
};

export default Login;
