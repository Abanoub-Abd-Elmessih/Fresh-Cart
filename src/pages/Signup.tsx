import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Signup() {

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');



    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };



  return (
    <div className="container p-10 text-emerald-600">
        <h2 className="text-3xl font-inter text-center my-7 font-semibold">Sign Page</h2>
    <form className="border-2 border-emerald-400 shadow-md p-5 rounded-lg">
    <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
        <label htmlFor="first_name" className="block mb-2 text-sm font-medium ">Your name</label>
        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-800  text-sm rounded-lg outline-emerald-400 block w-full p-2.5" placeholder="Abanoub Abd Elmessih" required />
        </div>
        <div>
        <label htmlFor="phone" className="block mb-2 text-sm font-medium  ">Phone number</label>
        <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-800  text-sm rounded-lg outline-emerald-400 block w-full p-2.5" placeholder="+20 123 456 7890" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
        </div>
    </div>
    <div className="mb-6">
        <label htmlFor="email" className="block mb-2 text-sm font-medium ">Email address</label>
        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-800  text-sm rounded-lg outline-emerald-400 block w-full p-2.5" placeholder="john.doe@company.com" required />
    </div> 
    <div className="mb-6 relative">
                <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg outline-emerald-400 block w-full p-2.5 pr-10"
                    placeholder="•••••••••"
                    required
                />
                {password && (
                    <div 
                        className="absolute top-10 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                )}
        </div>
    <div className="mb-6 relative">
                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium">Confirm password</label>
                <input
                    type={showPassword ? "text" : "password"}
                    id="confirm_password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg outline-emerald-400 block w-full p-2.5 pr-10"
                    placeholder="•••••••••"
                    required
                />
                {confirmPassword && (
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
        <label htmlFor="remember" className="ms-2 text-sm font-medium  dark:text-gray-300">I agree with the <a href="#" className="text-emerald-600 underline">terms and conditions</a>.</label>
    </div>
    <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Submit</button>
    </form>
    </div>
  )
}
