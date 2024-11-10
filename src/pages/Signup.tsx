import { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from 'yup';
import { useFormik } from "formik";

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const { token, setToken } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    interface values {
        name: string;
        phone: string;
        email: string;
        password: string;
        confirmPassword: string;
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    async function sendData(values: values) {
        setIsLoading(true);
        try {
            const response = await axios.post(
                'https://ecommerce.routemisr.com/api/v1/auth/signup',
                {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    rePassword: values.confirmPassword,
                    phone: values.phone,
                }
            );
            console.log('registration data', response.data);
            setToken(response.data.token);
        } catch (error) {
            console.error("Signup error:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        document.body.style.overflow = isLoading ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isLoading]);

    const validationSchema = yup.object({
        name: yup.string().required('Please Enter Your Name').min(3, 'Name minimum is 3 characters').max(20, 'Name maximum is 15 characters'),
        phone: yup.string().required('Please Enter Your Phone number').matches(/^01[0125][0-9]{8}$/, 'Must be a valid Egyptian number'),
        email: yup.string().required('Please Enter Your Email').email('Email Must Be Valid'),
        password: yup.string().required('Please Enter Your Password').matches(/^[A-Za-z][A-Za-z0-9]{5,8}$/, 'Password must start with a letter, be 6-9 characters long, and contain only letters and numbers'),
        confirmPassword: yup.string().required('Please re-enter your Password').oneOf([yup.ref('password')], "Passwords don't match"),
    });

    const formik = useFormik<values>({
        initialValues: {
            name: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            sendData(values);
            resetForm();
        },
    });

    if (isLoading) {
        return (
            <div className="loader-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="loader border-t-4 border-emerald-600 rounded-full w-12 h-12 animate-spin" />
            </div>
        );
    }

    return (
        <div className="container p-10 text-emerald-600">
            <h2 className="text-3xl font-inter text-center my-7 font-semibold">SignUp Page</h2>
            <form onSubmit={formik.handleSubmit} className="border-2 border-emerald-400 shadow-md p-5 rounded-lg my-2">
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium ">Your name</label>
                        <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg outline-emerald-400 block w-full p-2.5" placeholder="Abanoub Abd Elmessih" required />
                        {formik.errors.name && formik.touched.name ? <div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            <span className="font-medium">{formik.errors.name}</span>
                        </div> : null}
                    </div>
                    <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium ">Phone number</label>
                        <input type="tel" id="phone" name="phone" value={formik.values.phone} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg outline-emerald-400 block w-full p-2.5" placeholder="+20 123 456 7890" required />
                        {formik.errors.phone && formik.touched.phone ? <div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            <span className="font-medium">{formik.errors.phone}</span>
                        </div> : null}
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium ">Email address</label>
                    <input type="email" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg outline-emerald-400 block w-full p-2.5" placeholder="john.doe@company.com" required />
                    {formik.errors.email && formik.touched.email ? <div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                        <span className="font-medium">{formik.errors.email}</span>
                    </div> : null}
                </div> 
                <div className="mb-6 relative">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formik.values.password} 
                        onChange={formik.handleChange} 
                        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg outline-emerald-400 block w-full p-2.5 pr-10"
                        placeholder="•••••••••"
                        required
                    />
                    {formik.errors.password && formik.touched.password ? (
                        <div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            <span className="font-medium">{formik.errors.password}</span>
                        </div>
                    ) : null}

                    {/* Password Visibility Toggle */}
                    {formik.values.password && (
                        <div 
                            className="absolute top-10 right-0 flex items-center pr-3 cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    )}
                </div>

                <div className="mb-6 relative">
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium">Confirm Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword" // Bind to formik
                        value={formik.values.confirmPassword}  // Bind to formik value
                        onChange={formik.handleChange}  // Bind to formik handleChange
                        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg outline-emerald-400 block w-full p-2.5 pr-10"
                        placeholder="•••••••••"
                        required
                    />
                    {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                        <div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            <span className="font-medium">{formik.errors.confirmPassword}</span>
                        </div>
                    ) : null}

                    {/* Confirm Password Visibility Toggle */}
                    {formik.values.confirmPassword && (
                        <div 
                            className="absolute top-10 right-0 flex items-center pr-3 cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    )}
                </div>

                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-emerald-300" required />
                    </div>
                    <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900">I agree with the <a href="#" className="text-emerald-600 hover:underline">terms and conditions</a></label>
                </div>

                <button type="submit" className="w-full text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign up</button>
            </form>
            <Link to={'/Login'} className="underline text-center font-inter text-xl py-3 my-10">Already Have account?</Link>
        </div>
    );
}
