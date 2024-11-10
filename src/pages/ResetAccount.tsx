import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";

interface values {
  email: string;
  password: string;
}

export default function ResetAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Please enter your Email")
      .email("Must be valid Email"),
    password: Yup.string()
      .required("Please enter your Password")
      .matches(
        /^[A-Za-z][A-Za-z0-9]{5,8}$/,
        "Password must start with a letter, be 6-9 characters long, and contain only letters and numbers"
      ),
  });

  async function sendData(values: values) {
    setIsLoading(true);
    try {
      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          email: values.email,
          password: values.password,
        }
      );
      console.log("registration data", response.data);
      setToken(response.data.token);
      navigate('/'); // Navigate to home after success
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setError(error.response.data.message); // Use server error message if available
      } else {
        setError("An error occurred. Please try again."); // Fallback error message
      }
    } finally {
      setIsLoading(false);
    }
  }
  

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await sendData(values);
      resetForm(); // Reset form only after successful submission
    },
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
    <div className="container p-10 text-emerald-600">
      <h2 className="text-3xl font-inter text-center my-7 font-semibold">
        Reset Password
      </h2>
      <form
        onSubmit={formik.handleSubmit}
        className="border-2 border-emerald-400 shadow-md p-5 rounded-lg"
      >
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Your Email
          </label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg outline-emerald-400 block w-full p-2.5"
            placeholder="Abanoub Abd Elmessih"
            required
          />
        </div>

        {/* Password Field */}
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
            className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg outline-emerald-400 block w-full p-2.5 pr-10"
            placeholder="•••••••••"
            required
          />
          {/* Display password validation error */}
          {formik.errors.password && formik.touched.password && (
            <div
              className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <span className="font-medium">{formik.errors.password}</span>
            </div>
          )}

          {/* Password Visibility Toggle */}
          {formik.values.password && (
            <div
              className="absolute top-12 right-0 transform -translate-y-1/2 flex items-center pr-3 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
        >
          Update
        </button>
      </form>
    </div>
  );
}
