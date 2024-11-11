import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import * as yup from 'yup';
import axios from "axios";

interface Values {
    email: string;
    password: string;
}

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(""); // State to store error message
    const { token, setToken } = useContext(AuthContext);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    async function sendData(values: Values) {
        setIsLoading(true);
        setError(""); // Reset error message before making a request
        try {
            const response = await axios.post(
                'https://ecommerce.routemisr.com/api/v1/auth/signin',
                {
                    email: values.email,
                    password: values.password,
                }
            );
            console.log('registration data', response.data);
            setToken(response.data.token);
        } catch (error: unknown) { // Use `unknown` for the error type
            if (axios.isAxiosError(error)) {
                // Handle Axios-specific errors
                setError(error.response?.data?.message || "Login failed. Please try again.");
            } else {
                // Handle any other errors
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    }
    
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);

    const validationSchema = yup.object({
        email: yup.string().required('Please Enter Your Email').email('Email Must Be Valid'),
        password: yup.string().required('Please Enter Your Password')
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values, { resetForm }) => {
            sendData(values);
            resetForm();
        }
    });

    useEffect(() => {
        document.body.style.overflow = isLoading ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isLoading]);

    if (isLoading) {
        return (
            <div className="loader-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="loader border-t-4 border-emerald-600 rounded-full w-12 h-12 animate-spin" />
            </div>
        );
    }

    return (
        <div className="container p-10 md:min-h-[70vh] min-h-[66vh] flex flex-col justify-center text-emerald-600">
            <h2 className="text-3xl font-inter text-center my-7 font-semibold">Login Page</h2>
            <form className="border-2 border-emerald-400 shadow-md p-5 rounded-lg" onSubmit={formik.handleSubmit}>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                    Your Email
                </label>
                <div className="mb-6">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg outline-emerald-400 block w-full p-2.5"
                        placeholder="Abanoub@gmail.com"
                    />
                    {formik.errors.email && formik.touched.email && (
                        <div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            <span className="font-medium">{formik.errors.email}</span>
                        </div>
                    )}
                </div>
                <div className="mb-6 relative">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium">
                        Password
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg outline-emerald-400 block w-full p-2.5 pr-10"
                        placeholder="•••••••••"
                    />
                    {formik.values.password && (
                        <div
                            className="absolute top-10 right-0 flex items-center pr-3 cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    )}
                    {formik.errors.password && formik.touched.password && (
                        <div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            <span className="font-medium">{formik.errors.password}</span>
                        </div>
                    )}
                </div>
                {error && (
                    <div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                        <span className="font-medium">{error}</span>
                    </div>
                )}
                <div className="flex flex-col gap-4 md:flex-row justify-between items-center">
                    <button
                        type="submit"
                        className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center duration-300"
                    >
                        Login
                    </button>
                    <Link to={'/forgetpassword'} className="font-inter underline">
                        Forget Password?
                    </Link>
                </div>
            </form>
            <Link to={'/signup'} className="underline text-center font-inter text-xl py-3">New User ?</Link>
        </div>
    );
}
