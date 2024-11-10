import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

interface Value {
  resetCode: number;
}

export default function ResetCode() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();



  async function sendData(value: Value) {
    try {
      setIsLoading(true);
      const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        resetCode: value.resetCode.toString(), // Convert to string
      });
      
      console.log(response.data);
      navigate('/resetAccount')
    } catch (error) {
      setError("Wrong Code.");
      console.error("Error sending code:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object().shape({
    code: Yup.string()
      .required("Please enter your code")
      .matches(/^\d+$/, "Code must be a valid number"), // Ensures it's a number
  });

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      sendData({ resetCode: parseInt(values.code) }); // Convert to number
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
      <h2 className="text-3xl font-inter text-center my-7 font-semibold">Enter Your Code</h2>
      <form
        className="border-2 border-emerald-400 shadow-md p-5 rounded-lg"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-6">
          <label htmlFor="code" className="block mb-2 text-sm font-medium">
            Verification Code
          </label>
          <input
            type="text"
            id="code"
            name="code"
            value={formik.values.code}
            onChange={formik.handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg outline-emerald-400 block w-full p-2.5"
            placeholder="Enter the verification code"
            required
          />
          {formik.errors.code && formik.touched.code && (
            <div className="text-red-600 text-sm">{formik.errors.code}</div>
          )}
        </div>

        {error && (
          <div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            <span className="font-medium">{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
        >
          Verify
        </button>
      </form>
    </div>
  );
}
