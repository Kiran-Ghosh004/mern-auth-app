import { Link ,useNavigate} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { notifyError, notifySuccess } from '../utils.js';



const Signup = () => {
    const navigate = useNavigate();

    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupData({ ...signupData, [name]: value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupData;

        if (!name || !email || !password)
            return notifyError("All fields are required");

        try {
            const res = await fetch("authapi-red.vercel.app/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupData)
            });

            const result = await res.json();

            if (res.ok) {
                notifySuccess("Signup successful!");
                setSignupData({ name: "", email: "", password: "" });
                setTimeout(() => navigate("/login"), 1500);
            } else {
                notifyError(result.message || "Signup failed");
            }
        } catch (err) {
            notifyError("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900">
            <div className="w-full max-w-md bg-neutral-900 p-10 rounded-2xl shadow-lg border border-gray-700">
                <h2 className="text-3xl font-semibold text-white text-center mb-8">
                    Create Account
                </h2>

                <form className="space-y-6" onSubmit={handleSignup}>
                    {/* Name Field */}
                    <div className="flex flex-col">
                        <label className="text-gray-300 mb-1 text-sm">Name</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="name"
                            value={signupData.name}
                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col">
                        <label className="text-gray-300 mb-1 text-sm">Email</label>
                        <input
                            onChange={handleChange}
                            type="email"
                            name="email"
                            value={signupData.email}
                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col">
                        <label className="text-gray-300 mb-1 text-sm">Password</label>
                        <input
                            onChange={handleChange}
                            type="password"
                            name="password"
                            value={signupData.password}
                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
                    >
                        Sign Up
                    </button>

                    <div className="text-center mt-4 text-gray-400 text-sm">
                        <span>
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-blue-400 font-medium hover:underline"
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
