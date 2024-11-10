import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

interface Values {
  email: string;
}

export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Please enter your Email")
      .email("Must be valid Email"),
  });

  async function sendData(values: Values) {
    setIsLoading(true); // Set loading to true when sending the request
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          email: values.email,
        }
      );
      console.log("Forgot password response data", response.data);
      navigate('/resetcode')
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsLoading(false); // Set loading to false after request
    }
  }


  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      sendData(values);
      resetForm();
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
    <div className="container p-10 md:min-h-[70vh] min-h-[66vh] text-emerald-600">
      <h2 className="text-3xl font-inter text-center my-7 font-semibold">
        Enter Your Email
      </h2>
      <form className="border-2 border-emerald-400 shadow-md p-5 rounded-lg" onSubmit={formik.handleSubmit}>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium ">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-800  text-sm rounded-lg outline-emerald-400 block w-full p-2.5"
            placeholder="john.doe@company.com"
            required
          />
          {formik.errors.email && formik.touched.email && (
            <div
              className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
        >
          Verify
        </button>
      </form>
    </div>
  );
}
